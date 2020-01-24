import { Injectable } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";

Injectable()
export class DatabaseUser {
    private _storage: any;
    private _isInstantiated: boolean;

    public constructor() {
        if(!this._isInstantiated) {
            this._storage = new Couchbase("user");
            this._storage.createView("user","1", (document, emitter) => {
                emitter.emit(document._id, document);
            })
            this._isInstantiated = true;
        }
    }

    public getDatabase() {
        return this._storage;
    }

    public getUser() {
        return this.getDatabase().executeQuery("user");
    }
}