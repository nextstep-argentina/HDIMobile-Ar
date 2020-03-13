import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HdiService, Database } from "../../services/service.index";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, isAndroid, isIOS } from "tns-core-modules/ui/page/page";
import { topmost } from "tns-core-modules/ui/frame";

import * as platformModule from 'tns-core-modules/platform';

import { AppGlobal } from '../../shared/app.global';
import { Persona } from "../../models/persona";

@Component({
    templateUrl: './polizas.component.html',
    styleUrls: ['./polizas.component.css'],
    providers: [ AppGlobal ]
})
export class PolizasComponent implements OnInit {

    public fileText;
    public icoBin;
    public icoShare;
    public icoPhone;
    public codigoQR;
    public icoEye;
    public icoSSN;
    public icoProd;
    public icoReload;
    public result: string = "result";
    public icoPoliza;
    public icoInfo;
    public angleLeft;

    public polizas = [];
    public personas = [];

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
            'icon1' : 5.4,
            'paddT' : 2,
            'paddB' : 2
        },
        'List' : {
            'padd' : 3,
            'padd2' : 0.5,
            'paddB' : 2,
            'paddB2' : 3
        },
        'ListButt' : {
            'padd' : 0.7,
            'w' : 10,
            'h' : 7,
            'icon1' : 2.5,
            'ml' : 1.8,
        },
        'buttUpdate' : {
            'h' : 7,
            't1': 2,
            'icon1' : 3,
            'mt' : 0.5
        },
        'HistButt' : {
            'padd' : 0.5,
            'w' : 11,
            'h' : 7,
            'icon1' : 4
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


    constructor(
        private _routerExtensions: RouterExtensions,
        private _hdiService: HdiService,
        private _dataBase: Database,
        private _appGlobal: AppGlobal,
        page: Page
    ) {
        page.actionBarHidden = true;
        this.personas = this._dataBase.getTarjetasCirculacion();
        console.log("PEEEEE--->" + JSON.stringify(this.personas[0].polizas[0]));
        console.log("POLIZA--> "+ this.personas[0].polizas[0].Certificados[0].DatosMercosur.PolizaNro);
    }

    ngOnInit() {

        console.log('polizas screen > ' +  platformModule.screen.mainScreen.widthPixels + ' x ' + platformModule.screen.mainScreen.heightPixels + ' scale: ' + platformModule.screen.mainScreen.scale + ' round: ' + Math.ceil(platformModule.screen.mainScreen.scale) +' device: ' + platformModule.device.deviceType);


        //orientation
        const phoneW = ( this.screen.widthPixels < this.screen.heightPixels ? this.screen.widthPixels : this.screen.heightPixels );
        const phoneH = ( this.screen.heightPixels > this.screen.widthPixels ? this.screen.heightPixels : this.screen.widthPixels );

        //ActionBar
        this.layout.ActionBar.logo = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ActionBar.logo);
        this.layout.ActionBar.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ActionBar.padd);

        //titPrinc
        this.layout.titPrinc.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.icon1);
        this.layout.titPrinc.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddT);
        this.layout.titPrinc.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddB);


        //List
        this.layout.List.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.padd);
        this.layout.List.padd2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.padd2);
        this.layout.List.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.paddB);
        this.layout.List.paddB2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.List.paddB2);

        //ListButt
        this.layout.ListButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.ListButt.w);
        this.layout.ListButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.h);
        this.layout.ListButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.padd);
        this.layout.ListButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.icon1);
        this.layout.ListButt.ml = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.ListButt.ml);

        //ButtUpdate
        this.layout.buttUpdate.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttUpdate.h);
        this.layout.buttUpdate.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttUpdate.icon1);
        this.layout.buttUpdate.t1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttUpdate.t1);
        this.layout.buttUpdate.mt = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.buttUpdate.mt);

        //HistButt
        this.layout.HistButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.HistButt.w);
        this.layout.HistButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.h);
        this.layout.HistButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.padd);
        this.layout.HistButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.icon1);

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


        this.fileText = String.fromCharCode(0xe923);
        this.icoBin = String.fromCharCode(0xe928);
        this.icoShare = String.fromCharCode(0xe91a);
        this.icoPhone = String.fromCharCode(0xe943);
        this.codigoQR = String.fromCharCode(0xe939);
        this.icoEye = String.fromCharCode(0xe9cf);
        this.icoSSN = String.fromCharCode(0xe922);
        this.icoReload = String.fromCharCode(0xe924);
        this.icoProd = String.fromCharCode(0xe901);
        this.icoPoliza = String.fromCharCode(0xe915);
        this.icoInfo = String.fromCharCode(0xe926);
        this.angleLeft = String.fromCharCode(0xe90c);
    }

    onButtonHome() {
        this._routerExtensions.navigate(["/home"]);
    }

    onButtonBack() {
        topmost().goBack();
    }

    public ConfirmDeletePoliza(id_persona, pos, poliza) {
        dialogs.confirm({
            //title: "Name",
            message: "Usted está desvinculando de este dispositivo la Póliza Nro. " + poliza.Certificados[0].DatosMercosur.PolizaNro + " ?",
            cancelButtonText: "Cancelar",
            //neutralButtonText: "Ignore",
            okButtonText: "Aceptar"
        }).then((confirmResult) => {
            this.result = confirmResult + "";
            if(this.result == "true"){
                this.deletePoliza(id_persona,pos);
            }
            console.log("BORAAR? ( " + poliza._id + " ) "+this.result);
        });
    }

    public deletePoliza(id_persona, pos) {
        console.log("POSICION-->" + pos);
        let personaOld = this._dataBase.getTarjetaCirculacion(id_persona);
        if (personaOld.polizas.length == 1) {
            this._dataBase.deleteTarjetaCirculacion(id_persona);
            console.log("DELETE > UNA POLIZA");
        } else {
            console.log("MAS DE UNA POLIZA = "+personaOld.polizas.length);
            /*
            let polizas = JSON.parse(personaOld.polizas);
            console.log("ARRAY POLIZAS = "+polizas.length);
            */
            personaOld.polizas.splice(pos,1);
            console.log("ARRAY POLIZAS - 1 = "+personaOld.polizas.length);

            let person = new Persona(personaOld.tipo_dni, personaOld.dni, personaOld.nombre, personaOld.fechaNacimiento, personaOld.email, personaOld.telefono, personaOld.polizas);



            this._dataBase.deleteTarjetaCirculacion(id_persona);
            this._dataBase.getDatabase().createDocument(person);
        }

        this.personas = this._dataBase.getTarjetasCirculacion();
    }

    public actualizar(id_persona){
        let loader;
            if (isAndroid) {
                var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
                loader = new LoadingIndicator();

            } else if (isIOS) {
                var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
                loader = new LoadingIndicator();
            };
        var personaActual: Persona = this._dataBase.getTarjetaCirculacion(id_persona);
        loader.show();
        let user = {
            tipoDocumento : personaActual.tipo_dni,
            numeroDocumento : personaActual.dni,
            telefono : personaActual.telefono,
            mail : personaActual.email,
            fechaNacimiento : personaActual.fechaNacimiento
        }
        this._hdiService.getToken().subscribe(
            result => {
                var token = result.access_token
                this._hdiService.getTarjetaCirculacion(token, user).subscribe(
                    result => {
                        let polizasArr = [];
                        let nombre: string;
                        for(let poliza of result.CertificadosAutos.Polizas) {
                            polizasArr.push(poliza);
                            nombre =  poliza.DatosAsegurado.Nombre;
                        }
                        let persona = new Persona(user.tipoDocumento,user.numeroDocumento, nombre, user.fechaNacimiento, user.mail, user.telefono, polizasArr);
                        this._dataBase.deleteTarjetaCirculacion(id_persona);
                        this._dataBase.getDatabase().createDocument(persona);
                        this.personas = this._dataBase.getTarjetasCirculacion();
                        loader.hide();
                    },
                    error => {
                        loader.hide();
                        TNSFancyAlert.showError('Error',error.error.httpMessage,'Cerrar')
                    }
                )
            },
            error => {
                loader.hide();
                TNSFancyAlert.showError('Error',error,'Cerrar')
            }
        )
    }
}
