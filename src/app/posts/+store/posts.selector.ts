import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post, PostsState } from "./posts.state";

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, state => {
    return state.posts;
})

export const getPostByID = createSelector(getPostsState, (state: any, props: any) => {
    const pos = state.posts.find((post: Post) => post.id === Number(props.id));
    
    return pos
})