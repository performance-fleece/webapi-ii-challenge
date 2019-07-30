import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL
} from '../actions';

const initialState = {
  posts: [],
  comments: [],
  fetchingPosts: false,
  fetchingComments: false,
  error: '',
  addingPost: false,
  addingComment: false,
  deletingPost: false,
  deletingComment: false,
  updatingPost: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_START: {
      return {
        ...state,
        fetchingPosts: true,
        error: ''
      };
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        fetchingPosts: false,
        posts: action.payload
      };
    }
    case FETCH_POSTS_FAIL: {
      return {
        ...state,
        fetchingPosts: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
