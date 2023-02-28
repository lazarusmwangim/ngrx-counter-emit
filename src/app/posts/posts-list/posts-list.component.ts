import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/+store/app.state';
import { Post } from '../+store/posts.state';
import { getPosts } from '../+store/posts.selector';
import { deletePost, loadPosts } from '../+store/posts.action';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.select(getPosts);
  }

  onDeletePost(id: number) {
    if (confirm("Are you sure you want to delete?")) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
