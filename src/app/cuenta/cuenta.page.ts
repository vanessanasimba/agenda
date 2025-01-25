import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false
})
export class CuentaPage implements OnInit {
  txt_cedula:string="";
  txt_nombre: string="";
  txt_apellido: string = "";
  txt_correo: string = "";
  txt_clave: string = "";
  txt_cclave: string = "";
  mensaje: string = "";

  constructor(
    private servicio: AccesoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  vclave(){
    if(this.txt_clave == this.txt_cclave){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    } 
  }
  registrar(){
    if (this.txt_cedula!="" && this.txt_nombre!="" && this.txt_apellido!="" && this.txt_correo!="" && this.txt_clave!="" && this.txt_cclave!=""){
      if(this.txt_clave == this.txt_cclave){
        let datos = {
          "accion": 'cuenta',
          "cedula": this.txt_cedula,
          "nombre": this.txt_nombre,
          "apellido": this.txt_apellido,
          "correo": this.txt_correo,
          "clave": this.txt_clave
        }
        this.servicio.postData(datos).subscribe((resp:any) => {
          if(resp.estado){
            this.modalCtrl.dismiss();
            this.servicio.showToast(resp.mensaje, 3000);
          }
        });
      }else{
        this.servicio.showToast("Las claves no coinciden", 3000);
      }
    }else{
      this.servicio.showToast("Debe llenar todos los campos", 3000);
    }

  }
  cancelar(){
    this.modalCtrl.dismiss();
  }

  vcedula(){
    let datos = {
      accion: 'vcedula',
      cedula: this.txt_cedula
    }
    this.servicio.postData(datos).subscribe((resp:any) => {
      if(resp.estado){
        this.txt_cedula = "";
        this.servicio.showToast(resp.mensaje, 3000);
      }
    });
  }

}
