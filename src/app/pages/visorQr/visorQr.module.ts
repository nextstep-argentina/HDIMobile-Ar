import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { VisorQrRoutingModule } from "./visorQr-routing.module";
import { VisorQrComponent } from "./visorQr.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VisorQrRoutingModule,
        ServiceModule
    ],
    declarations: [
        VisorQrComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VisorQrModule { }