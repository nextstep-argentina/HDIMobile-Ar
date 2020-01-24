import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { RegistroComponent } from "./registro.component";
import { RegistroRoutingModule } from "./registro-routing.module";

import { ServiceModule } from "../../services/service.module"
import { MaskedTextFieldModule } from "nativescript-masked-text-field/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        RegistroRoutingModule,
        MaskedTextFieldModule,
        ServiceModule
    ],
    declarations: [
        RegistroComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RegistroModule { }