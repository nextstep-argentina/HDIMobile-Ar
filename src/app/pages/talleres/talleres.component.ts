import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { AppGlobal } from '../../shared/app.global';
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import * as email from "nativescript-email";
//import * as SocialShare from "nativescript-social-share";
import * as platformModule from 'tns-core-modules/platform';
import { topmost } from "tns-core-modules/ui/frame";

declare var android;

@Component({
    templateUrl: './talleres.component.html',
    styleUrls: ['./talleres.component.css'],
    providers: [ AppGlobal ]
})
export class TalleresComponent implements OnInit{

    icoPhone;
    icoEmail;
    icoTaller;
    icoShare;
    icoSSN;
    composeOptions: email.ComposeOptions;
    SocialShare;
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
        'List' : {
            'padd' : 3,
            'padd2' : 0.5,
            'paddB' : 2
        },
        'ListButt' : {
            'padd' : 0.7,
            'w' : 10,
            'h' : 7,
            'icon1' : 2.5,
            'ml' : 1.8
        },
        'general' : {
            'h1' : 2.25,
            'h2' : 2,
            'h3' : 1.8,
            'h4' : 1.6,
            'sep' : 0.8
        },
        'footer' : {
            'paddT' : 3,
            'paddB' : 1,
            'ssn' : 10
        }
    }

    call(telefono:string) {
        if (platformModule.isAndroid) {
            permissions
            .requestPermission(android.Manifest.permission.CALL_PHONE, "App Needthis Permission")
            .then(() =>{
                console.log('Got Permission');
                phone.dial(telefono, false);
            })
            .catch(() => {
                console.log('Permission Denied');
            });
        }

        if (platformModule.isIOS) {
            phone.dial(telefono, false);
        }

    }

    shareText(text:string) {
     //   SocialShare.shareText(text, "Usted desea compartir la información del Taller?");
    }

    sendEmail(destino:string) {
        email.available().then(available => {
            if (available) {
                email.compose(this.composeOptions = {
                    to: [destino],
                    subject: "Consulta desde la app HDI",
                    body: ""
                }).then(result => {
                    console.log(result);
                }).catch(error => console.error(error));
            }
        }).catch(error => console.error(error));
    }


    onButtonTap(): void {
        console.log("Button was pressed");
    }

    constructor(
        private _routerExtensions: RouterExtensions,
        private _appGlobal: AppGlobal,
        page: Page
        ) {
            page.actionBarHidden = true;
            //console.log("TALLERES CONSTRUCTOR");
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

        //ListButt
        this.layout.ListButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.ListButt.w);
        this.layout.ListButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.h);
        this.layout.ListButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.padd);
        this.layout.ListButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.icon1);
        this.layout.ListButt.ml = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.ListButt.ml);

        //footer
        this.layout.footer.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddT);
        this.layout.footer.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddB);
        this.layout.footer.ssn = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.ssn);

        //general
        this.layout.general.h1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h1);
        this.layout.general.h2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h2);
        this.layout.general.h3 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h3);
        this.layout.general.h4 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h4);
        this.layout.general.sep = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.sep);

        //icons
        this.icoPhone = String.fromCharCode(0xe943);
        this.icoEmail= String.fromCharCode(0xe91f);
        this.icoTaller = String.fromCharCode(0xe903);
        this.icoShare = String.fromCharCode(0xe91a);
        this.icoSSN = String.fromCharCode(0xe922);
        this.angleLeft = String.fromCharCode(0xe90c);

        console.log("TALLERES INIT");
    }

    onButtonHome() {
        this._routerExtensions.navigate(["/home"]);
    }

    onButtonBack() {
        topmost().goBack();
    }

}
