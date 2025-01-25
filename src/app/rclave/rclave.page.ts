import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
  standalone: false
})
export class RclavePage implements OnInit {

  txt_cedula:string="";
  txt_clave: string="";
  txt_clave_conf: string = "";
  mensaje: string ="";
  mensajeusuario : string = "";
  usuariovalido: boolean = true;
  enableGuardar: boolean = true;

  constructor(
     private servicio: AccesoService,
     private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  vclave(){
    if(this.txt_clave == this.txt_clave_conf){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    } 
  }

  vcedula(){
    let datos = {
      accion: 'vcedula',
      cedula: this.txt_cedula
    }
    this.servicio.postData(datos).subscribe((resp:any) => {
      if(resp.estado){
        this.servicio.showToast(resp.mensaje, 3000);
        this.mensajeusuario = "Usuario encontrado cambie la contrasena ";
        this.usuariovalido = false;
        this.enableGuardar = false;
      }
    });
  }

  recuperar(){  
    let datos = {
      accion: 'recuperar',
      cedula: this.txt_cedula,
      clave: this.txt_clave
    }

    this.servicio.postData(datos).subscribe((resp:any) => {
      if(resp.estado){
        this.servicio.showToast(resp.mensaje, 3000);
        this.modalCtrl.dismiss();
      }
    });


  }
  cancelar(){
    this.modalCtrl.dismiss();
  }

}
