import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { CommonModule } from "@angular/common";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterButtonComponent } from "./counter-button/counter-button.component";
import { CustomCounterInputComponent } from "./custom-counter-input/custom-counter-input.component";

const routes: Routes = [
    {
        path: 'counter',
        component: CounterComponent
    },
]

@NgModule({

    imports: [
        CounterComponent,
        CounterOutputComponent,
        CommonModule,
        CounterButtonComponent,
        CustomCounterInputComponent,
        RouterModule.forChild(routes)]
})
export class CounterModule { }