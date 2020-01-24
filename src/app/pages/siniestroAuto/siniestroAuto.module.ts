import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SiniestroAutoRoutingModule } from "./siniestroAuto-routing.module";
import { SiniestroAutoComponent } from "./siniestroAuto.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SiniestroAutoRoutingModule
    ],
    declarations: [
        SiniestroAutoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SiniestroAutoModule { }
