import { Component, ElementRef, OnInit, ViewChild  } from "@angular/core";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { GridLayout, GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { topmost } from "tns-core-modules/ui/frame";


import { Database } from "../../services/service.index";

import * as platformModule from 'tns-core-modules/platform';

import { AppGlobal } from '../../shared/app.global';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './mercosur.component.html',
    styleUrls: ['./mercosur.component.css'],
    providers: [ AppGlobal ]
})
export class MercosurComponent implements OnInit{
    @ViewChild('Page', { static: true }) Page: ElementRef;
    @ViewChild('GridCard', { static:true }) GridCard: ElementRef;

    public polizaPos2;
    public poliza;
    public angleLeft;
    public angleRight;
    public icoFirma;

    screen = {
        'deviceType' : platformModule.device.deviceType,
        'widthPixels' : platformModule.screen.mainScreen.widthPixels,
        'heightPixels' : platformModule.screen.mainScreen.heightPixels,
        'scale' : platformModule.screen.mainScreen.scale
    };
    layout = {
        'GridLayout' : {
            'col0' : 7.5,
            'col1' : 1,
            'col2' : 7.5
        },
        'card' : {
            'logo' : 12,
            'paddL' : 3,
            'paddR' : 3,
            'paddT' : 4,
            'paddB' : 4
        },
        'HistButt' : {
            'padd' : 0.5,
            'w' : 10,
            'h' : 7,
            'icon1' : 2.1
        },
        'general' : {
            'h1' : 2.75,
            'h2' : 1.95,
            'h3' : 1.95,
            'h4' : 1.75,
            'h5' : 1.55,
            'sep' : 0.55
        },
        'firma' :{
            'h1' : 5
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
        let id = this._activatedRoute.snapshot.paramMap.get('id');
        let pos = this._activatedRoute.snapshot.paramMap.get('pos');
        let pos2 = this._activatedRoute.snapshot.paramMap.get('pos2');
        this._pageRoute.activatedRoute
        this.poliza = this._database.getTarjetaCirculacion(id).polizas[pos];
        this.polizaPos2 = pos2;
        page.actionBarHidden = true;
    }

    ngOnInit() {

        //orientation
        const phoneW = ( this.screen.widthPixels < this.screen.heightPixels ? this.screen.widthPixels : this.screen.heightPixels );
        const phoneH = ( this.screen.heightPixels > this.screen.widthPixels ? this.screen.heightPixels : this.screen.widthPixels );

        //Grid
        const gridCard = this.GridCard.nativeElement;
        gridCard.addColumn(new ItemSpec(this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.GridLayout.col0), GridUnitType.PIXEL));
        gridCard.addColumn(new ItemSpec(this.layout.GridLayout.col1, "star"));
        gridCard.addColumn(new ItemSpec(this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.GridLayout.col2), GridUnitType.PIXEL));

        //card
        this.layout.card.logo = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.card.logo);
        this.layout.card.paddL = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.card.paddL);
        this.layout.card.paddR = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.card.paddR);
        this.layout.card.paddT = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.card.paddT);
        this.layout.card.paddB = this._appGlobal.screenRes(phoneW, this.screen.scale, this.layout.card.paddB);

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
        this.layout.general.h5 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.h5);
        this.layout.general.sep = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.general.sep);

        //firma
        this.layout.firma.h1 = this._appGlobal.screenRes(phoneH, this.screen.scale, this.layout.firma.h1);

        //icons
        this.angleLeft = String.fromCharCode(0xe90c);
        this.angleRight = String.fromCharCode(0xe90d);
        this.icoFirma = String.fromCharCode(0xe925);
    }

    onButtonDorso() {
        //topmost().goBack();
        this._routerExtensions.navigate(["/polizaDorso", this._activatedRoute.snapshot.paramMap.get('id'), this._activatedRoute.snapshot.paramMap.get('pos'), this._activatedRoute.snapshot.paramMap.get('pos2')], {
            transition: {
                name: 'slideRight'
            }
        });
    }
}
