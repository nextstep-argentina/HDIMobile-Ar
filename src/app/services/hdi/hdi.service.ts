import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common//http";
import { Observable } from "rxjs";
import { GLOBAL } from "../config/global";


@Injectable()
export class HdiService {
    private _url: string;
    private _client_id: string;
    private _client_secret: string;
    private _scpe: string;
    private _grant_type:string;

    constructor(
        private _http: HttpClient
    ) {
        this._url = GLOBAL.url;
        this._client_id = GLOBAL.client_id;
        this._client_secret = GLOBAL.client_secret;
        this._scpe = GLOBAL.scope;
        this._grant_type = GLOBAL.grant_type
    }

    public getToken(): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
        let params = new HttpParams().set("client_id", this._client_id)
                                     .set("client_secret", this._client_secret)
                                     .set("scope", this._scpe)
                                     .set("grant_type", this._grant_type);
        return this._http.post(this._url + "proveedordeoauthhdi/oauth2/token", params, {headers: headers});
    }

    public getTarjetaCirculacion(token: string, params): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type","application/json")
                                       .set("Authorization","Bearer " + token)
                                       .set("x-ibm-client-id", this._client_id);
                                       console.log(JSON.stringify(params));
        return this._http.post(this._url + "mobile/obtenerTarjetaCirculacion", JSON.stringify(params), {headers: headers});
    }
}