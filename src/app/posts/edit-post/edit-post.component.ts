import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store/app.state';
import { getPostByID } from '../+store/posts.selector';
import { Post } from '../+store/posts.state';
import { Subscription } from 'rxjs';
import { updatePost } from '../+store/posts.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy  {
  postForm!: FormGroup;
  post!: Post;
  postSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostByID, { id }).subscribe(data => {
        this.post = data;
        console.log(data)
        this.postForm = new FormGroup({
          title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
          description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
        })
      })
    })
  }

  onUpdatePost() {
    if(!this.postForm.valid) {
      return
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description
    }

    this.store.dispatch(updatePost({post}))
   }

  showTitle() {
    const desc = this.postForm.get('title');
    if (desc?.touched && !desc.valid) {
      if (desc.errors?.['required']) {
        return 'Title is required.'
      }
      if (desc.errors?.['minlength']) {
        return 'Title length shoukd be at least 6 characters'
      }
    }

    return
  }

  showDescription() {
    const desc = this.postForm.get('description');
    if (desc?.touched && !desc.valid) {
      if (desc.errors?.['required']) {
        return 'Description is required.'
      }
      if (desc.errors?.['minlength']) {
        return 'Description length shoukd be at least 10 characters'
      }
    }

    return
  }

  ngOnDestroy(): void {
      if(this.postSubscription) {
        this.postSubscription.unsubscribe();
      }
  }
}
