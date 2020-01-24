import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TalleresRoutingModule } from "./talleres-routing.module";
import { TalleresComponent } from "./talleres.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TalleresRoutingModule
    ],
    declarations: [
        TalleresComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TalleresModule { }