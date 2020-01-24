import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProductorRoutingModule } from "./productor-routing.module";
import { ProductorComponent } from "./productor.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductorRoutingModule
    ],
    declarations: [
        ProductorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductorModule { }