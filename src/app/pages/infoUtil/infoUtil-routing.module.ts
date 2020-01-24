import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { InfoUtilComponent } from "./infoUtil.component";

const routes: Routes = [
    { path: "", component: InfoUtilComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class InfoUtilRoutingModule { }