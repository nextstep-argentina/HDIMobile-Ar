import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { PageRoute } from "nativescript-angular/router";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import { Page, isAndroid, isIOS  } from "tns-core-modules/ui/page/page";

import { HdiService, Database, DatabaseUser } from "../../services/service.index";
import * as EmailValidator from "email-validator";
import * as platformModule from 'tns-core-modules/platform';
import { AppGlobal } from "../../shared/app.global";
import { action } from "tns-core-modules/ui/dialogs";

import { Persona } from "../../models/persona";

import { registerElement } from "nativescript-angular";
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

@Component({
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'], 
    providers: [ AppGlobal, TNSCheckBoxModule ],
})
export class RegistroComponent implements OnInit{

    public tipoDocumento: string = "DOCUMENTO DE IDENTIDAD";
    public numeroDocumento: string;
    public fechaNacimiento: string;
    public email: string;
    public telefono: string;
    public terminos: boolean;

    public icoSSN;
    public icoEye;
    public icoDown;
    public angleLeft;

    displayActionDialog() {
        // >> action-dialog-code
        let options = {
            title: "SELECCIONAR TIPO DE DOCUMENTO",
            message: "ELEGIR",
            cancelButtonText: "Cancelar",
            actions: ["DOCUMENTO DE IDENTIDAD", "LIBRETA ENROLAMIENTO", "LIBRETA CÍVICA", "CÉDULA DE IDENTIDAD", "PASAPORTE", "CUIT"]
        };

        action(options).then((result) => {
            if(result == "Cancelar")
                this.tipoDocumento = "DNI";
            else
                this.tipoDocumento = result;
        });
        // << action-dialog-code
    }

    @ViewChild("CB1", { static: true}) FirstCheckBox: ElementRef;

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
        'form' : {
            'padd' : 3,
            'inputPaddT' : 0.8, 
            'inputPaddB' : 1.8,
            'inputText' : 2.3,
            'label' : 1.8,
            'buttText' : 2,
            'buttHeight': 7,
            'buttTermText' : 1.8,
            'buttMt' : 2,
            'select' : 3
        },
        'ListButt' : {
            'padd' : 0.5, 
            'w' : 7.5, 
            'h' : 3.5, 
            'icon1' : 2
        },
        'HistButt' : {
            'padd' : 0.5, 
            'w' : 11, 
            'h' : 7, 
            'icon1' : 4
        },
        'ListSelect' : {
            'icon1' : 3
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
        },
    }

    constructor(
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _hdiService: HdiService,
        private _database: Database,
        private _databaseUser: DatabaseUser, 
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

        //titPrinc
        this.layout.titPrinc.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.icon1);
        this.layout.titPrinc.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddT); 
        this.layout.titPrinc.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.titPrinc.paddB);  
        
        //form
        this.layout.form.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.padd);
        this.layout.form.inputPaddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.inputPaddT);
        this.layout.form.inputPaddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.inputPaddB);
        this.layout.form.inputText = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.inputText);
        this.layout.form.label = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.label);
        this.layout.form.buttText = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.buttText);
        this.layout.form.buttHeight = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.buttHeight);
        this.layout.form.buttTermText = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.buttTermText);
        this.layout.form.buttMt = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.buttMt);
        this.layout.form.select = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.form.select);

        //ListButt
        this.layout.ListButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.ListButt.w);
        this.layout.ListButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.h);
        this.layout.ListButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.padd);
        this.layout.ListButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListButt.icon1);

        //HistButt
        this.layout.HistButt.w = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.HistButt.w);
        this.layout.HistButt.h = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.h);
        this.layout.HistButt.padd = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.padd);
        this.layout.HistButt.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.HistButt.icon1);

        //ListSelect
        this.layout.ListSelect.icon1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.ListSelect.icon1);

        //footer
        this.layout.footer.paddT = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddT);
        this.layout.footer.paddB = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.paddB);
        this.layout.footer.ssn = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.footer.ssn);

        //general
        this.layout.general.iconUl = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.iconUl);
        this.layout.general.h1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h1);
        this.layout.general.h2 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h2);
        this.layout.general.h3 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h3);
        this.layout.general.h4 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h4);
        this.layout.general.sep = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.sep);

        //icons        
        this.icoSSN = String.fromCharCode(0xe922); 
        this.icoEye = String.fromCharCode(0xe9cf);
        this.icoDown = String.fromCharCode(0xe90b);
        this.angleLeft = String.fromCharCode(0xe90c);
    }

    private getCheckProp() {
        return this.FirstCheckBox.nativeElement.checked;
    }
    
    private isDate(day, month, year){
        var trigger = day + '-' + month + '-' + year,
            regexp = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/),
            result = regexp.test(trigger);
            console.log(result);
        return result;
    }

    private isNroDoc(nroDoc){
        var trigger = nroDoc,
            regexp = new RegExp(/^[0-9]{7,11}$/),
            result = regexp.test(trigger);
        return result;
    }
    
    private isPhone(nroPhone){
        var trigger = nroPhone,
            regexp = new RegExp(/^[0-9]{8,15}$/),
            result = regexp.test(trigger);
        return result;
    }

    private isDate18orMoreYearsOld(day, month, year) {
        console.log("FECHA : " + day + " : " + month + " : " + year);
        let birthdate = +new Date(year, month-1, day);
        let start = Date.now();
        var timeDiff = Math.abs(start - birthdate);
        return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }

    private validarDatos() {
        console.log(this.fechaNacimiento);
        if(this.tipoDocumento == "SELECCIONAR TIPO DE DOCUMENTO") {
            TNSFancyAlert.showError('Error','Debe seleccionar tipo de documento','Cerrar');
            return false;
        }

        if(this.numeroDocumento == null || this.numeroDocumento == "" || !this.isNroDoc(this.numeroDocumento)) {
            TNSFancyAlert.showError('Error','Debe ingresar correctamente su número de documento','Cerrar');
            return false;
        }

        if(this.fechaNacimiento == null || this.fechaNacimiento == "" || !this.isDate(this.fechaNacimiento.substring(0,2), this.fechaNacimiento.substring(3,5), this.fechaNacimiento.substring(6,10))) {
            TNSFancyAlert.showError('Error','Debe ingresar su fecha de nacimiento correctamente','Cerrar');
            return false;
        }else{
            if(this.isDate18orMoreYearsOld(this.fechaNacimiento.substring(0,2), this.fechaNacimiento.substring(3,5), this.fechaNacimiento.substring(6,10)) < 18){
                TNSFancyAlert.showError('Error','Debe ser mayor de 18 años','Cerrar');
                return false;
            }
            if(this.isDate18orMoreYearsOld(this.fechaNacimiento.substring(0,2), this.fechaNacimiento.substring(3,5), this.fechaNacimiento.substring(6,10)) > 85){
                TNSFancyAlert.showError('Error','Debe ser menor de 85 años','Cerrar');
                return false;
            }
        }

        if (!EmailValidator.validate(this.email)) {
            TNSFancyAlert.showError('Error','Email inválido','Cerrar');
            return false;
        }

        if(this.telefono == null || this.telefono == "" || !this.isPhone(this.telefono)) {
            TNSFancyAlert.showError('Error','Debe ingresar su nro. de teléfono correctamente','Cerrar');
            return false;
        }

        if (!this.getCheckProp()) {
            TNSFancyAlert.showError('Error','Debe aceptar los términos y condiciones','Cerrar'); 
            return false;
        }
        return true;
    }

    private getCodigoDocumento(tipoDocumento: string): string {
        switch(tipoDocumento) { 
            case "LIBRETA ENROLAMIENTO": { 
               return "1"; 
            } 
            case "LIBRETA CÍVICA": { 
                return "2";
            } 
            case "CÉDULA DE IDENTIDAD": {
               return "3";
            } 
            case "DOCUMENTO DE IDENTIDAD": { 
               return "4";
            }  
            case "PASAPORTE": { 
               return "5";             
            }
            case "CUIT": { 
                return "98";             
            }
            default : { 
                return "4";             
            } 
        }
    }

    public register() {

        if (this.validarDatos()) {
            let loader;
            if (isAndroid) {
                var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
                loader = new LoadingIndicator();
    
            } else if (isIOS) {
                var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
                loader = new LoadingIndicator();
            };
            loader.show();
            let user = {
                tipoDocumento : this.getCodigoDocumento(this.tipoDocumento),
                numeroDocumento : this.numeroDocumento,
                telefono : this.telefono,
                mail : this.email,
                fechaNacimiento : this.fechaNacimiento.replace("_","").split("-").reverse().join("-")
            }
            this._databaseUser.getDatabase().createDocument(user);
            var personas = this._database.getTarjetasCirculacion();
            for (let personaArr of personas) {
                if (personaArr.dni == user.numeroDocumento) {
                    this._database.deleteTarjetaCirculacion(personaArr._id);
                }
            }
            this._hdiService.getToken().subscribe(
                result => {
                    var token = result.access_token
                    this._hdiService.getTarjetaCirculacion(token, user).subscribe(
                        result => {
                            loader.hide();
                            let polizasArr = [];
                            let nombre: string;       
                            for(let poliza of result.CertificadosAutos.Polizas) {
                                polizasArr.push(poliza);
                                nombre =  poliza.DatosAsegurado.Nombre;
                            }
                            let persona = new Persona(user.tipoDocumento,user.numeroDocumento, nombre, user.fechaNacimiento, user.mail, user.telefono, polizasArr);
                            this._database.getDatabase().createDocument(persona);
                            this._routerExtensions.navigate(["/home"], { clearHistory: true });
                        },
                        error => {
                            loader.hide();
                            TNSFancyAlert.showError('Error',error.error.httpMessage,'Cerrar');
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

    onButtonHome() {
        this._routerExtensions.navigate(["/home"]);
    }

    onButtonBack() {
        this._routerExtensions.back();
    }

    doneTap(args) {
        var myTextField = args.object;
        myTextField.dismissSoftInput();
    }
    
}