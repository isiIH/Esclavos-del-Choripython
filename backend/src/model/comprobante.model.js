export class Comprobante {
    constructor({id,monto,fecha_pago,arancel_matricula,enlace_foto}){
        this.id = id;
        this.monto = monto;
        this.fecha_pago = fecha_pago;
        this.arancel_matricula = arancel_matricula;
        this.enlace_foto = enlace_foto;
    }
}