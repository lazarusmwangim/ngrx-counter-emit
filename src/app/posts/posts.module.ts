import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { SidebarComponent } from "../shared/components/sidebar/sidebar.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { StoreModule } from "@ngrx/store";
import { postsReducer } from "./+store/posts.reducer";
import { POST_STATE_NAME } from "./+store/posts.selector";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "./+store/posts.effects";

const routes: Routes = [
    {
        path: '',
        component: PostsListComponent,
        children: [
            { path: 'add', component: AddPostComponent },
            { path: 'edit/:id', component: EditPostComponent }
        ]
    }
]

@NgModule({
    declarations: [
        PostsListComponent,
        SidebarComponent,
        AddPostComponent,
        EditPostComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME, postsReducer),
        EffectsModule.forFeature([PostsEffects])
    ]
})
export class PostsModule { }