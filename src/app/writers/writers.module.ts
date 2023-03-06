import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WritersComponent } from "./writers/writers.component";
import { AddWriterComponent } from "./add-writer/add-writer.component";
import { RouterModule, Routes } from "@angular/router";
import { EditWriterComponent } from './edit-writer/edit-writer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const routes: Routes = [
    {
        path: '',
        component: WritersComponent,
        children: [
            { path: 'add', component: AddWriterComponent },
            { path: 'edit', component: EditWriterComponent }
        ]
    }
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        WritersComponent,
        AddWriterComponent,
        EditWriterComponent
    ],
    exports: []
})
export class WritersModule { }