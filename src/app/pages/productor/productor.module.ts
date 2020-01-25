import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProductorRoutingModule } from "./productor-routing.module";
import { ProductorComponent } from "./productor.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductorRoutingModule,
        ServiceModule
    ],
    declarations: [
        ProductorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductorModule { }