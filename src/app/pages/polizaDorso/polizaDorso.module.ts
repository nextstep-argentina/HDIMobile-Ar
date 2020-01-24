import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PolizaDorsoRoutingModule } from "./polizaDorso-routing.module";
import { PolizaDorsoComponent } from "./polizaDorso.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PolizaDorsoRoutingModule,
        ServiceModule
    ],
    declarations: [
        PolizaDorsoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PolizaDorsoModule { }