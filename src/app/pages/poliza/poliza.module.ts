import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { PolizaRoutingModule } from "./poliza-routing.module";
import { PolizaComponent } from "./poliza.component";
import { ServiceModule } from "~/app/services/service.module";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        PolizaRoutingModule,
        ServiceModule
    ],
    declarations: [
        PolizaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PolizaModule { }