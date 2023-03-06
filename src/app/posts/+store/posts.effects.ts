import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/+store/app.state";
import { PostsService } from "src/app/_services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostFailure, updatePostSuccess } from "./posts.action";
import { map, mergeMap, switchMap } from "rxjs";


@Injectable()
export class PostsEffects {
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private actions$: Actions,
        private postsService: PostsService
    ) { }

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postsService.getPosts().pipe(
                    map((posts) => {
                        // console.log(posts);
                        return loadPostsSuccess({ posts })
                    })
                )
            })
        )
    }/* , { dispatch: false } */
    );

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postsService.addPost(action.post).pipe(map(
                    (post) => {
                        return addPostSuccess({ post });
                    }
                ))
            })
        )
    });

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post).pipe(map(
                    (data) => {
                        console.log(data)
                        if (data.success === false) {
                            const message = data.message ? data.message : "Error occured"
                            return updatePostFailure({ message });
                        }

                        return updatePostSuccess({ post: action.post });
                    }
                ))
            })
        )
    });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            mergeMap((action) => {
                const id = action.id
                return this.postsService.deletePost(id).pipe(map(
                    (data) => {
                        console.log(data)
                        return deletePostSuccess({ id });
                    }
                ))
            })
        )
    })
}