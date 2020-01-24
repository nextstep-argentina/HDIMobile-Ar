import { Injectable } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";

Injectable()
export class Database {
    private _storage: any;
    private _isInstantiated: boolean;

    public constructor() {
        if(!this._isInstantiated) {
            this._storage = new Couchbase("hdi");
            this._storage.createView("poliza","1", (document, emitter) => {
                emitter.emit(document._id, document);
            })
            this._isInstantiated = true;
        }
    }

    public getDatabase() {
        return this._storage;
    }
    
    public getTarjetaCirculacion(id: string) {
        return this.getDatabase().getDocument(id);
    }

    public deleteTarjetaCirculacion(id: string) {
        return this.getDatabase().deleteDocument(id);
    }

    public getTarjetasCirculacion() {
        return this.getDatabase().executeQuery("poliza");
    }
}