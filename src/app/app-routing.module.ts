import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'counter',
        loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)
    },
    {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {

}