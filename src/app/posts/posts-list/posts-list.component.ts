import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store/app.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  constructor(private store: Store<AppState>) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
