import axios from 'axios';

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';

export const FETCH_COMMENTS_START = 'FETCH_COMMENTS_START';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL';

export const fetchPosts = () => dispatch => {
  dispatch({ type: FETCH_POSTS_START });
  axios
    .get('http://localhost:4000/api/posts/')
    .then(res => {
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_POSTS_FAIL, payload: err.message });
    });
};
