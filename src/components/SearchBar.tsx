type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="search-label">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="public-apis, react, llama, docker..."
        aria-label="Search repositories"
      />
    </label>
  );
}
