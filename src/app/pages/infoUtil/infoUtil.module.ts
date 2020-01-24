import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { InfoUtilRoutingModule } from "./infoUtil-routing.module";
import { InfoUtilComponent } from "./infoUtil.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        InfoUtilRoutingModule
    ],
    declarations: [
        InfoUtilComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InfoUtilModule { }