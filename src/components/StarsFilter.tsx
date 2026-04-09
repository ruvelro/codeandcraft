type StarsFilterProps = {
  value: number;
  onChange: (value: number) => void;
};

const OPTIONS = [0, 1000, 5000, 10000, 25000, 50000, 100000];

export default function StarsFilter({ value, onChange }: StarsFilterProps) {
  return (
    <label className="stars-filter">
      <span className="search-label">Minimum stars</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option.toLocaleString('es-ES')}
          </option>
        ))}
      </select>
    </label>
  );
}
