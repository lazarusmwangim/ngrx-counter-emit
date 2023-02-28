import { HttpClient } from "@angular/common/http";
import { AppState } from "../+store/app.state";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Post } from "../posts/+store/posts.state";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    url = environment.url;

    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ) { }

    getPosts(): Observable<Post[]> {
        console.log("NNAJ")
        return this.http.get<Post[]>(this.url + "posts").pipe(map((data) => {
            const posts: Post[] = [];

            for (let key in data) {
                posts.push(data[key])
            }

            return posts;
        }))
    }
}