import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SiniestroAutoComponent } from "./siniestroAuto.component";

const routes: Routes = [
    { path: "", component: SiniestroAutoComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SiniestroAutoRoutingModule { }