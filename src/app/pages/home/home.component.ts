import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Database } from "../../services/service.index";
import * as platformModule from 'tns-core-modules/platform';
import { AppGlobal } from '../../shared/app.global';
import { Router, NavigationEnd } from '@angular/router';
import { Page } from "tns-core-modules/ui/page/page";


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ AppGlobal ]
})
export class HomeComponent implements OnInit {

    public texto;

    public icoCar;
    public icoTaller;
    public fileText;
    public codigoQR;
    public angleRight;
    public angleLeft;
    public support2;
    public icoSSN;
    public icoPoliza;
    public icoDownload;
    public icoInfo;
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
        'titPrinc' : {
            't1' : 2.25,
            'paddT' : 2,
            'paddB' : 2
        },
        'GridLayout' : {
            'row0' : 1,
            'row1' : 23.5,
            'row2' : 1
        },
        'buttHome' : {
            'height' : 9.5,
            'paddL' : 11,
            'paddLIco' : 1,
            'paddRIco' : 1,
            'icon1' : 4.2,
            'icon2' : 2.5,
        },
        'buttInfo' : {
            'height' : 8.5,
            'paddL' : 12.5,
            'paddLIco' : 1.5,
            'paddRIco' : 1.5,
            'icon1' : 5.2,
            'icon2' : 3,
        },
        'HistButt' : {
            'padd' : 0.5,
            'w' : 11,
            'h' : 7,
            'icon1' : 4
        },
        'general' : {
            'h1' : 2,
            'h2' : 1.75,
            'h3' : 1.8,
            'h4' : 1.6,
            'sep' : 0.8
        },
        'footer' : {
            'paddT' : 1,
            'paddB' : 1,
            'ssn' : 10
        }
    };

    private _result;
    public welcome;
    public user;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _dataBase: Database,
        private _appGlobal: AppGlobal,
        private router: Router,
        page: Page
    ) {
        page.actionBarHidden = true;
        this.router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                if(this.router.url == "/home"){
                    if (this._dataBase.getTarjetasCirculacion().length > 0) {
                        this.welcome = 'HDI da la bienvenida a:';
                        this.user = this._dataBase.getTarjetasCirculacion()[0].nombre;
                    } else {
                        this.welcome = 'HDI da la bienvenida a';
                        this.user = 'nuestra aplicación Móvil';
                    }
                };
            }
        });
    }

    ngOnInit(): void {

        //orientation
        const phoneW = ( this.screen.widthPixels < this.screen.heightPixels ? this.screen.widthPixels : this.screen.heightPixels );
        const phoneH = ( this.screen.heightPixels > this.screen.widthPixels ? this.screen.heightPixels : this.screen.widthPixels );

        //ActionBar
        this.layout.ActionBar.logo = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ActionBar.logo);
        this.layout.ActionBar.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ActionBar.padd);

        //titPrinc
        this.layout.titPrinc.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddT);
        this.layout.titPrinc.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddB);

        //Button Home
        this.layout.buttHome.height = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttHome.height);
        this.layout.buttHome.paddL = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.buttHome.paddL);
        this.layout.buttHome.paddLIco = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.buttHome.paddLIco);
        this.layout.buttHome.paddRIco = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.buttHome.paddRIco);
        this.layout.buttHome.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttHome.icon1);
        this.layout.buttHome.icon2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttHome.icon2);

        //Button Info
        this.layout.buttInfo.height = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttInfo.height);
        this.layout.buttInfo.paddL = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.buttInfo.paddL);
        this.layout.buttInfo.paddLIco = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.buttInfo.paddLIco);
        this.layout.buttInfo.paddRIco = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.buttInfo.paddRIco);
        this.layout.buttInfo.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttInfo.icon1);
        this.layout.buttInfo.icon2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttInfo.icon2);

        //HistButt
        this.layout.HistButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.HistButt.w);
        this.layout.HistButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.h);
        this.layout.HistButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.padd);
        this.layout.HistButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.icon1);

        //general
        this.layout.general.h1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h1);
        this.layout.general.h2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h2);
        this.layout.general.h3 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h3);
        this.layout.general.h4 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h4);
        this.layout.general.sep = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.sep);

        //footer
        this.layout.footer.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddT);
        this.layout.footer.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddB);
        this.layout.footer.ssn = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.ssn);

        //icons
        this.icoCar = String.fromCharCode(0xe90a);
        this.icoTaller = String.fromCharCode(0xe903);
        this.fileText = String.fromCharCode(0xe923);
        this.codigoQR = String.fromCharCode(0xe939);
        this.support2 = String.fromCharCode(0xe905);
        this.angleRight = String.fromCharCode(0xe90d);
        this.angleLeft = String.fromCharCode(0xe90c);
        this.icoSSN = String.fromCharCode(0xe922);
        this.icoPoliza = String.fromCharCode(0xe915);
        this.icoDownload = String.fromCharCode(0xe91c);
        this.icoInfo = String.fromCharCode(0xea0d);
    }

    onButtonTap(): void {
        console.log("Button was pressed");
    }

    onButtonHome() {
        this._routerExtensions.navigate(["/home"]);
    }

    onButtonBack() {
        this._routerExtensions.back();
    }

    public goPolizas() {
        if (this._dataBase.getTarjetasCirculacion().length > 0) {
            this._routerExtensions.navigate(["/polizas"]);
        } else {
            this._routerExtensions.navigate(["/registro"]);
        }
    }
}
