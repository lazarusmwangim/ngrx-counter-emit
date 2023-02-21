import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
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

  onAddPost() {
    if(!this.postForm.valid){
      return;
    }
    console.log(this.postForm.value)
  }
}
