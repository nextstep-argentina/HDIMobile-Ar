export class Persona {
    constructor(
        public tipo_dni:string,
        public dni: string,
        public nombre: string,
        public fechaNacimiento: string,
        public email: string,
        public telefono: string,
        public polizas: any[]
    ){}
}