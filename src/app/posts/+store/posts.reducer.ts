import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { addPost } from "./posts.action";

const _postsReducer = createReducer(initialState, on(addPost, (state, action) => {
    let post = {...action.post}
    post.id = state.posts.length + 1;
    return {
        ...state,
        posts: [...state.posts, post]
    }
}))

export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action);
}