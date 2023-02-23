import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { CommonModule } from "@angular/common";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CounterCustomInputComponent } from "./counter-custom-input/counter-custom-input.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { counterReducer } from "./+store/counter.reducer";
import { COUNTER_STATE_NAME } from "./+store/counter.selectors";

const routes: Routes = [
    {
        path: '',
        component: CounterComponent
    },

]

@NgModule({
    declarations: [
        CounterComponent,
        CounterOutputComponent,
        CounterButtonsComponent,
        CounterCustomInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
    ]
})
export class CounterModule {

}