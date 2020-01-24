import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, isAndroid, isIOS } from "tns-core-modules/ui/page/page";

import { Database } from "../../services/service.index";

import * as platformModule from 'tns-core-modules/platform';

import { AppGlobal } from '../../shared/app.global';

import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
import { ActivatedRoute } from "@angular/router";

registerElement('PDFView', () => PDFView);

@Component({
    templateUrl: './pdfview.component.html',
    styleUrls: ['./pdfview.component.css'], 
    providers: [ AppGlobal ]
})
export class PdfviewComponent implements OnInit{
    public angleLeft;
    public angleRight;
    public icoFirma;

    public load;
    
    public src;
    public pdfList = {
        'condgralauto' : 'https://www.hdi.com.ar/wps/wcm/connect/0604da2c-0e5c-42da-b31f-1999fdb6b1bb/Condiciones+Generales+Seguro+de+Autom%C3%B3viles.pdf?MOD=AJPERES&CVID=mi5NsNC&CVID=mi5NsNC',
        'condrcautoweb' : 'https://www.hdi.com.ar/wps/wcm/connect/d27135be-ead1-4199-b3fc-6606d9d36a66/Condiciones+RC+Autos+WEB.pdf?MOD=AJPERES&CVID=mfqZCi8&CVID=mfqZCi8',
        'servasistauto' : 'https://www.hdi.com.ar/wps/wcm/connect/1726a5ce-5908-465e-adcc-020ab238bc6a/Ss+de+assistencia+AUTOMOVIL+IKE+ASISTENCIA+ARGENTINA+SA.pdf?MOD=AJPERES&CVID=mfblT19&CVID=mfblT19&CVID=mfblT19&CVID=mfblT19&CVID=mfblT19',
        'siniestroauto' : 'https://www.hdi.com.ar/wps/wcm/connect/06987155-054b-442e-8ae8-35743d90dbb5/Denuncia+siniestros+automoviles-2018.pdf?MOD=AJPERES&CVID=mg4uMyU&CVID=m6PM0rf&CVID=m6PM0rf&CVID=m6PM0rf&CVID=m6PM0rf'
    };

    screen = {
        'deviceType' : platformModule.device.deviceType,
        'widthPixels' : platformModule.screen.mainScreen.widthPixels,
        'heightPixels' : platformModule.screen.mainScreen.heightPixels,
        'scale' : platformModule.screen.mainScreen.scale   
    };
    layout = {
        'ActionBar' : {
            'logo' : 9,
            'padd' : 1.5
        },
        'HistButt' : {
            'padd' : 0.5, 
            'w' : 11, 
            'h' : 7, 
            'icon1' : 4
        }
    }
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _database: Database,
        page: Page,
        private _appGlobal: AppGlobal
    ) {
        page.actionBarHidden = true;

        if (isAndroid) {
            var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
            this.load = new LoadingIndicator();

        } else if (isIOS) {
            var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
            this.load = new LoadingIndicator();
        };
        this.load.show();
        this.src = this._activatedRoute.snapshot.paramMap.get('src');
    }

    ngOnInit() {

        //orientation
        const phoneW = ( this.screen.widthPixels < this.screen.heightPixels ? this.screen.widthPixels : this.screen.heightPixels );
        const phoneH = ( this.screen.heightPixels > this.screen.widthPixels ? this.screen.heightPixels : this.screen.widthPixels );

        //ActionBar
        this.layout.ActionBar.logo = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ActionBar.logo);
        this.layout.ActionBar.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ActionBar.padd);

        //HistButt
        this.layout.HistButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.HistButt.w);
        this.layout.HistButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.h);
        this.layout.HistButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.padd);
        this.layout.HistButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.icon1);

        //icons
        this.angleLeft = String.fromCharCode(0xe90c);
        this.angleRight = String.fromCharCode(0xe90d);
        this.icoFirma = String.fromCharCode(0xe925);
    }

    onButtonBack() {
        this._routerExtensions.back();
    }

    onLoad() {
        this.load.hide();
        console.log("Loaded");
    }

}