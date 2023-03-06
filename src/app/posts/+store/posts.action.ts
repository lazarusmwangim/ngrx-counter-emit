import { createAction, props } from "@ngrx/store";
import { Post } from "./posts.state";

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const ADD_POST_FAILURE = '[posts page] add post failure';

export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const UPDATE_POST_FAILURE = '[posts page] update post failure';

export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const DELETE_POST_FAILURE = '[posts page] delete post failure';

export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';
export const LOAD_POSTS_FALURE = '[posts page] load posts failure';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const addPostSuccess = createAction(
    ADD_POST_SUCCESS,
    props<{ post: Post }>()
);

export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());

export const updatePostSuccess = createAction(
    UPDATE_POST_SUCCESS,
    props<{ post: Post }>()
);

export const updatePostFailure = createAction(
    UPDATE_POST_FAILURE,
    props<{ message: string }>()
);

export const deletePost = createAction(
    DELETE_POST_ACTION,
    props<{ id: number }>()
);

export const deletePostSuccess = createAction(
    DELETE_POST_SUCCESS,
    props<{id: number}>()
);

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostsSuccess = createAction(
    LOAD_POSTS_SUCCESS,
    props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(LOAD_POSTS_FALURE);