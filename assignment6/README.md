# Assignment 6 - Post Dashboard

A React application built with Vite demonstrating clean separation of concerns, asynchronous data fetching, state management using `useReducer`, and derived state filtering.

## File Organization

- `src/api/postsApi.js`: Pure JavaScript module handling API communication with JSONPlaceholder via the native Fetch API. Contains no React imports or UI code.
- `src/reducer/postsReducer.js`: Pure reducer function and initial state managing `loading`, `error`, and `posts` states immutably.
- `src/components/Post.jsx`: Pure presentational component responsible for rendering individual post titles and bodies.
- `src/components/PostList.jsx`: Renders the collection of posts using `.map()` with stable unique keys.
- `src/components/FilterForm.jsx`: Controlled form component handling the title search query input without storing filter results.
- `src/App.jsx`: Root orchestrator managing state with `useReducer`, triggering async fetch with `useEffect` and `AbortController`, computing derived filter state during render, and handling loading/error/empty UI states.

## Challenges Faced

1. **Clean Fetch Cleanup & Abort Handling**: Ensuring that component unmounting or React StrictMode re-renders did not cause state updates on unmounted components required integrating an `AbortController`. Handling `AbortError` specifically in the catch block was critical to avoid false error states in the UI.
2. **Derived State vs. Redundant State**: Adhering strictly to the requirement of not storing filtered results in state. Instead, computing `filteredPosts` directly during the render cycle kept state minimal and synchronized with user input.
3. **Explicit State Representation**: Coordinating distinct visual representations for loading (`Loading posts...`), error (`Error: ...`), and empty (`No posts found.`) states cleanly without layout flickering.