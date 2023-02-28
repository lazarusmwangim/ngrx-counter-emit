import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/+store/app.state";
import { PostsService } from "src/app/_services/posts.service";
import { loadPosts, loadPostsSuccess } from "./posts.action";
import { map, mergeMap } from "rxjs";


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
}