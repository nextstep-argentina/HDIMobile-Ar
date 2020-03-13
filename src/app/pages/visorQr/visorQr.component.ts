import { Component, OnInit } from "@angular/core";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";

import { Database } from "../../services/service.index";

import * as imgSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as imageModule from "tns-core-modules/ui/image";

import * as platformModule from 'tns-core-modules/platform';
import * as SocialShare from "nativescript-social-share";


const ZXing = require("nativescript-zxing");

import { AppGlobal } from '../../shared/app.global';
import { ActivatedRoute } from '@angular/router';
import { topmost } from "tns-core-modules/ui/frame";

@Component({
    templateUrl: './visorqr.component.html',
    styleUrls: ['./visorqr.component.css'],
    providers: [ AppGlobal ]
})
export class VisorQrComponent implements OnInit{

    public poliza;
    public polizaPos;
    public polizaPos2;
    public polizaID;
    public img;
    public icoShare;
    public codigoQR;
    public icoSSN;
    public angleLeft;

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
        'ImgQr' :{
            'h' : 40,
        },
        'buttQr' : {
            'h' : 7,
            't1': 2,
            'icon1' : 3,
            'mt' : 0.5
        },
        'general' : {
            'h1' : 2.25,
            'h2' : 2,
            'h3' : 1.9,
            'h4' : 1.6,
            'sep' : 1
        },
        'footer' : {
            'paddT' : 1,
            'paddB' : 1,
            'ssn' : 10
        }
    }

    constructor(
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _database: Database,
        page: Page,
        private _appGlobal: AppGlobal,
        private _activatedRoute: ActivatedRoute
    ) {
        page.actionBarHidden = true;
        let id = this._activatedRoute.snapshot.paramMap.get('id');
        let pos = this._activatedRoute.snapshot.paramMap.get('pos');
        let pos2 = this._activatedRoute.snapshot.paramMap.get('pos2');
        this._pageRoute.activatedRoute
        this.poliza = this._database.getTarjetaCirculacion(id).polizas[pos];
        this.polizaPos = pos;
        this.polizaID = id;
        this.polizaPos2 = pos2;
        this.generateQr();
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

        //image
        this.layout.ImgQr.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ImgQr.h);

        //buttQr
        this.layout.buttQr.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttQr.h);
        this.layout.buttQr.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttQr.icon1);
        this.layout.buttQr.t1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttQr.t1);
        this.layout.buttQr.mt = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttQr.mt);

        //footer
        this.layout.footer.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddB);
        this.layout.footer.paddT= this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddT);
        this.layout.footer.ssn = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.ssn);

        //general
        this.layout.general.h1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h1);
        this.layout.general.h2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h2);
        this.layout.general.h3 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h3);
        this.layout.general.h4 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h4);
        this.layout.general.sep = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.sep);

        //icons
        this.codigoQR = String.fromCharCode(0xe939);
        this.icoShare = String.fromCharCode(0xe91a);
        this.icoSSN = String.fromCharCode(0xe922);
        this.angleLeft = String.fromCharCode(0xe90c);

        console.log("TALLERES INIT");
    }

    public generateQr() {
        const zx = new ZXing();
        //console.log(JSON.stringify(this.poliza));
        let str = 'POLIZA: ' + this.poliza.Certificados[this.polizaPos2].DatosMercosur.PolizaNro + '\n'
        + 'VIGENCIA DE LA COBERTURA \n'
        + 'Desde 12 hs: ' + this.poliza.Certificados[this.polizaPos2].TarjetaCirculacion.Desde + '\n'
        + 'Hasta 12 hs: ' + this.poliza.Certificados[this.polizaPos2].TarjetaCirculacion.Hasta + '\n'
        + 'DOMINIO: ' + this.poliza.Certificados[this.polizaPos2].DatosMercosur.Matricula + '\n'
        + 'AÑO: ' + this.poliza.Certificados[this.polizaPos2].DatosMercosur.Anio + '\n'
        + 'ASISTENCIA: ' + this.poliza.Certificados[this.polizaPos2].TarjetaCirculacion.Asistencia + '\n'
        + 'MARCA: ' + this.poliza.Certificados[this.polizaPos2].DatosMercosur.Marca + ' ' + this.poliza.Certificados[this.polizaPos2].DatosMercosur.Modelo + '\n'
        + 'MOTOR: ' + this.poliza.Certificados[this.polizaPos2].DatosMercosur.Motor;
        //str = str.substr(0,str.length - 1);
        console.log('STR > '+ str);
        const qr = zx.createBarcode({encode: str, height: 100, width: 100, format: ZXing.QR_CODE});
        this.img = imgSource.fromNativeSource(qr);
    }

    public compartir() {
       SocialShare.shareImage(this.img);
    }

    onButtonHome() {
        this._routerExtensions.navigate(["/home"]);
    }

    onButtonBack() {
        topmost().goBack();
    }

}
