export default function FilterForm({ searchTerm, onSearchChange }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: '20px' }}>
      <label htmlFor="search-input" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Filter posts by title:
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Type to filter..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '8px 12px',
          fontSize: '14px',
          boxSizing: 'border-box'
        }}
      />
    </form>
  );
}