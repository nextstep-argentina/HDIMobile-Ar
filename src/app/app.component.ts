import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import * as orientation from 'nativescript-orientation';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 
    constructor(private _router: Router) {
        
        this._router.events.pipe(
            filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
                if((e.url.indexOf('/poliza/') > -1) || (e.url.indexOf('/mercosur/') > -1) || (e.url.indexOf('/polizaDorso/') > -1)){
                    if( orientation.getOrientation() != 'landscape' ){
                        orientation.setOrientation("landscape");
                    }
                }else{
                    if( orientation.getOrientation() != 'portrait' ){
                        orientation.setOrientation('portrait');
                    }
                }
            });
            
    }
}
