import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PolizaDorsoComponent } from "./polizaDorso.component";

const routes: Routes = [
    { path: "", component: PolizaDorsoComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PolizaDorsoRoutingModule { }