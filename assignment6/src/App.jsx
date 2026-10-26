import { useReducer, useState, useEffect } from 'react';
import { postsReducer, initialState } from './reducer/postsReducer';
import { fetchPosts } from './api/postsApi';
import PostList from './components/PostList';
import FilterForm from './components/FilterForm';

export default function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', payload: err.message || 'An error occurred' });
        }
      }
    }

    loadPosts();

    return () => {
      controller.abort();
    };
  }, []);

  // Critical Requirement: Derived state directly computed during render
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <main style={{ maxWidth: '750px', margin: '30px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h1>Post Dashboard</h1>

      <FilterForm searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Explicit Loading State */}
      {state.loading && <p>Loading posts...</p>}

      {/* Explicit Error State */}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}

      {/* Explicit Empty State */}
      {!state.loading && !state.error && filteredPosts.length === 0 && (
        <p>No posts found.</p>
      )}

      {/* Post List Rendering */}
      {!state.loading && !state.error && filteredPosts.length > 0 && (
        <PostList posts={filteredPosts} />
      )}
    </main>
  );
}