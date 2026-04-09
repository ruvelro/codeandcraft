import csv
import json
import os
import time
from pathlib import Path

import requests


BASE_DIR = Path(__file__).resolve().parent
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
MIN_STARS = 1000
MAX_PAGES = 10
RESULTS_PER_PAGE = 100

CATALOG_CSV_PATH = BASE_DIR / "repositories_catalog.csv"
DELTA_CSV_PATH = BASE_DIR / "new_repositories.csv"
CATEGORIES_JSON_PATH = BASE_DIR / "categories.json"

CSV_HEADERS = ["Category", "Keyword", "Owner", "Repository", "Description", "Url", "Stars"]
REQUEST_HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}


def load_categories():
    """Load category and keyword definitions from the JSON file."""
    if not CATEGORIES_JSON_PATH.exists():
        print(f"ERROR: '{CATEGORIES_JSON_PATH.name}' was not found.")
        print("Create it in the same folder as this script before running the scraper.")
        raise SystemExit(1)

    try:
        with CATEGORIES_JSON_PATH.open("r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        print(f"ERROR: '{CATEGORIES_JSON_PATH.name}' is not valid JSON.")
        raise SystemExit(1)


def load_existing_repository_urls():
    """Read the canonical catalog and return existing repository URLs."""
    urls = set()
    if CATALOG_CSV_PATH.exists():
        with CATALOG_CSV_PATH.open(mode="r", encoding="utf-8", newline="") as file:
            reader = csv.DictReader(file)
            for row in reader:
                url = (row.get("Url") or "").strip()
                if url:
                    urls.add(url)
    return urls


def build_repository_row(category, keyword, item):
    description = (item.get("description") or "No description").replace("\n", " ").strip()
    return [
        category,
        keyword,
        item["owner"]["login"],
        item["name"],
        description if description else "No description",
        item["html_url"],
        item["stargazers_count"],
    ]


def write_delta_file(rows):
    with DELTA_CSV_PATH.open(mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(CSV_HEADERS)
        writer.writerows(rows)


def append_to_catalog(rows):
    file_exists = CATALOG_CSV_PATH.exists()
    with CATALOG_CSV_PATH.open(mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(CSV_HEADERS)
        writer.writerows(rows)


def run_scraper():
    category_keywords = load_categories()
    existing_urls = load_existing_repository_urls()
    new_rows = []

    print(f"Loaded {len(category_keywords)} categories from '{CATEGORIES_JSON_PATH.name}'.")
    print(f"Current catalog contains {len(existing_urls)} repositories.")

    for category, keywords in category_keywords.items():
        print(f"\nProcessing category: {category}")
        for keyword in keywords:
            for page in range(1, MAX_PAGES + 1):
                url = (
                    "https://api.github.com/search/repositories"
                    f"?q={keyword} stars:>={MIN_STARS}&sort=stars&per_page={RESULTS_PER_PAGE}&page={page}"
                )
                response = requests.get(url, headers=REQUEST_HEADERS, timeout=30)

                if response.status_code in (403, 429):
                    print("    [!] GitHub API rate limit reached. Waiting 60 seconds before retrying...")
                    time.sleep(60)
                    response = requests.get(url, headers=REQUEST_HEADERS, timeout=30)

                if response.status_code != 200:
                    break

                items = response.json().get("items", [])
                if not items:
                    break

                for item in items:
                    repository_url = item["html_url"]
                    if repository_url in existing_urls:
                        continue

                    new_rows.append(build_repository_row(category, keyword, item))
                    existing_urls.add(repository_url)

                time.sleep(2)

    write_delta_file(new_rows)
    append_to_catalog(new_rows)

    print(
        f"\nDONE: Saved {len(new_rows)} new repositories to '{DELTA_CSV_PATH.name}' "
        f"and appended them to '{CATALOG_CSV_PATH.name}'."
    )


if __name__ == "__main__":
    if not GITHUB_TOKEN:
        print("Set the GITHUB_TOKEN environment variable before running this scraper for normal API limits.")
    run_scraper()
