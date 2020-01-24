import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeInfoRoutingModule } from "./homeInfo-routing.module";
import { HomeInfoComponent } from "./homeInfo.component";
import { ServiceModule } from "~/app/services/service.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeInfoRoutingModule,
        ServiceModule
    ],
    declarations: [
        HomeInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeInfoModule { }