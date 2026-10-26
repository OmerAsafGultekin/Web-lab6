export default function Post({ title, body }) {
  return (
    <article style={{ border: '1px solid #ddd', padding: '12px', margin: '8px 0', borderRadius: '4px' }}>
      <h3 style={{ textTransform: 'capitalize', marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#555', marginBottom: 0 }}>{body}</p>
    </article>
  );
}