import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppGlobal {
    screenRes(size: number, scale: number, percentage: number) {
        var res=Math.floor(((size/scale)*percentage)/100);
        //console.log('size: ' +size+ ' scale: '+scale+' percentage: '+percentage+' res: '+res);
        return res;
    }
    rowsCant(cant){
        let res="";
        for(var i=0; i<cant; i++ ){
            res+=(res.length>0?",":"")+"auto";
        }
        return res;
    }
    transform(value){
		return value.replace(/\D/g,'');
	}
}