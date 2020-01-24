import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/pages/home/home.module").then((m) => m.HomeModule) },
    { path: "homeInfo", loadChildren: () => import("~/app/pages/homeInfo/homeInfo.module").then((m) => m.HomeInfoModule) },
    { path: "terminos", loadChildren: () => import("~/app/pages/terminos/terminos.module").then((m) => m.TerminosModule) },
    { path: "talleres", loadChildren: () => import("~/app/pages/talleres/talleres.module").then((m) => m.TalleresModule) },
    { path: "registro", loadChildren: () => import("~/app/pages/registro/registro.module").then((m) => m.RegistroModule) },
    { path: "pdfview/:src", loadChildren: () => import("~/app/pages/pdfview/pdfview.module").then((m) => m.PdfviewModule) },
    { path: "siniestroAuto", loadChildren: () => import("~/app/pages/siniestroAuto/siniestroAuto.module").then((m) => m.SiniestroAutoModule) },
    { path: "infoUtil", loadChildren: () => import("~/app/pages/infoUtil/infoUtil.module").then((m) => m.InfoUtilModule) },
    { path: "polizas", loadChildren: () => import("~/app/pages/polizas/polizas.module").then((m) => m.PolizasModule) },
    { path: "productor/:id/:pos", loadChildren: () => import("~/app/pages/productor/productor.module").then((m) => m.ProductorModule) },
    { path: "poliza/:id/:pos/:pos2", loadChildren: () => import("~/app/pages/poliza/poliza.module").then((m) => m.PolizaModule) },
    { path: "polizaDorso", loadChildren: () => import("~/app/pages/polizaDorso/polizaDorso.module").then((m) => m.PolizaDorsoModule) },
    { path: "polizaDorso/:id/:pos/:pos2", loadChildren: () => import("~/app/pages/polizaDorso/polizaDorso.module").then((m) => m.PolizaDorsoModule) },
    { path: "mercosur", loadChildren: () => import("~/app/pages/mercosur/mercosur.module").then((m) => m.MercosurModule) },
    { path: "mercosur/:id/:pos/:pos2", loadChildren: () => import("~/app/pages/mercosur/mercosur.module").then((m) => m.MercosurModule) },
    { path: "visorqr", loadChildren: () => import("~/app/pages/visorQr/visorQr.module").then((m) => m.VisorQrModule) },
    { path: "visorqr/:id/:pos/:pos2", loadChildren: () => import("~/app/pages/visorQr/visorQr.module").then((m) => m.VisorQrModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
