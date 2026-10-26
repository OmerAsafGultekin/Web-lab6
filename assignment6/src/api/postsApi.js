export async function fetchPosts(signal) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}