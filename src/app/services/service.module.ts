import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
    HdiService,
    Database,
    DatabaseUser
} from "./service.index"

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [ 
        HdiService,
        Database,
        DatabaseUser 
    ],
    declarations: []
})
export class ServiceModule{ }