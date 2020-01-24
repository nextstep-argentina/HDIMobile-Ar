import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PdfviewRoutingModule } from "./pdfview-routing.module";
import { PdfviewComponent } from "./pdfview.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PdfviewRoutingModule,
        ServiceModule
    ],
    declarations: [
        PdfviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PdfviewModule { }
