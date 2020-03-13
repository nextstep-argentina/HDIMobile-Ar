import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as platformModule from 'tns-core-modules/platform';
import { AppGlobal } from '../../shared/app.global';
import { Page } from "tns-core-modules/ui/page/page";
import { topmost } from "tns-core-modules/ui/frame";

@Component({
    templateUrl: './siniestroAuto.component.html',
    styleUrls: ['./siniestroAuto.component.css'],
    providers: [ AppGlobal ]
})
export class SiniestroAutoComponent implements OnInit{

    public icoCar;
    public angleRight;
    public angleLeft;
    public supportBoy;
    public icoPDF;
    public icoSSN;
    public icoPhone;

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
        },
        'titPrinc' : {
            'icon1' : 5.4,
            'paddT' : 2,
            'paddB' : 2
        },
        'List' : {
            'padd' : 3,
            'padd2' : 0.5,
            'paddB' : 2
        },
        'buttIcon' : {
            'h' : 7,
            't1': 2,
            'icon1' : 3,
            'mt' : 1
        },
        'general' : {
            'iconUl' : 1.8,
            'h1' : 2.25,
            'h2' : 2,
            'h3' : 1.9,
            'h4' : 1.6,
            'sep' : 1
        },
        'footer' : {
            'paddT' : 3,
            'paddB' : 1,
            'ssn' : 10
        }
    }

    constructor(
        private _routerExtensions: RouterExtensions,
        private _appGlobal: AppGlobal,
        page: Page
    ) {
        page.actionBarHidden = true;
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

        //titPrinc
        this.layout.titPrinc.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.icon1);
        this.layout.titPrinc.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddT);
        this.layout.titPrinc.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddB);

        //List
        this.layout.List.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.padd);
        this.layout.List.padd2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.padd2);
        this.layout.List.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.paddB);

        //buttIcon
        this.layout.buttIcon.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttIcon.h);
        this.layout.buttIcon.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttIcon.icon1);
        this.layout.buttIcon.t1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttIcon.t1);
        this.layout.buttIcon.mt = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttIcon.mt);

        //footer
        this.layout.footer.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddB);
        this.layout.footer.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddT);
        this.layout.footer.ssn = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.ssn);

        //general
        this.layout.general.iconUl = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.iconUl);
        this.layout.general.h1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h1);
        this.layout.general.h2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h2);
        this.layout.general.h3 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h3);
        this.layout.general.h4 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h4);
        this.layout.general.sep = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.sep);

        //icons
        this.icoCar = String.fromCharCode(0xe90a);
        this.angleRight = String.fromCharCode(0xe90d);
        this.angleLeft = String.fromCharCode(0xe90c);
        this.supportBoy = String.fromCharCode(0xe912);
        this.icoPDF = String.fromCharCode(0xe91e);
        this.icoSSN = String.fromCharCode(0xe922);
        this.icoPhone = String.fromCharCode(0xe943);
    }

    onButtonHome() {
        this._routerExtensions.navigate(["/home"]);
    }

    onButtonBack() {
        topmost().goBack();
    }

}
