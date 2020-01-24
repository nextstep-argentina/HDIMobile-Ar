import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PolizasRoutingModule } from "./polizas-routing.module";
import { PolizasComponent } from "./polizas.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PolizasRoutingModule,
        ServiceModule
    ],
    declarations: [
        PolizasComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PolizasModule { }