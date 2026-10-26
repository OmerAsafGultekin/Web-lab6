import { useReducer, useEffect } from 'react';
import { postsReducer, initialState } from './reducer/postsReducer';
import { fetchPosts } from './api/postsApi';
import PostList from './components/PostList';

export default function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        // Ham hata yakalama (AbortError kontrolü henüz yok)
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    }

    loadPosts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main style={{ maxWidth: '750px', margin: '30px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h1>Post Dashboard</h1>

      {state.loading && <p>Loading posts...</p>}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
      {!state.loading && !state.error && <PostList posts={state.posts} />}
    </main>
  );
}