import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MercosurRoutingModule } from "./mercosur-routing.module";
import { MercosurComponent } from "./mercosur.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MercosurRoutingModule,
        ServiceModule
    ],
    declarations: [
        MercosurComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MercosurModule { }