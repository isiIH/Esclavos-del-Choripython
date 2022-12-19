export class Comprobante {
    constructor({num_boleta,monto,fecha_pago,arancel_matricula,enlace_foto}){
        this.num_boleta = num_boleta;
        this.monto = monto;
        this.fecha_pago = fecha_pago;
        this.arancel_matricula = arancel_matricula;
        this.enlace_foto = enlace_foto;
    }
}