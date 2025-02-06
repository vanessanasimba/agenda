import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: false
})
export class ContactosPage implements OnInit {
  codigo:string = "";
  txt_nombre:string = "";
  txt_telefono:string = "";
  txt_correo:string = "";
  txt_apellido:string = "";
  mensaje:string ="";

  constructor(
    private servicio: AccesoService,
    private navCtrl: NavController
  ) {
    this.servicio.getSession('idpersona').then((res:any)=>{
      this.codigo = res;
    });
  }

  ngOnInit() {
  }

  verificarNumero(){
    let datos ={
      "accion": 'vtelefono',
      "telefono": this.txt_telefono,
      "persona": this.codigo
    }
    this.servicio.postData(datos).subscribe(
      (response:any)=>{
       this.mensaje = response.mensaje;
      }
    );

  }
  guardar(){
    let datos={
      "accion": 'nuevoc',
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "telefono": this.txt_telefono,
      "mail": this.txt_correo,
      "persona": this.codigo
    }
    this.servicio.postData(datos).subscribe(
      (response:any)=>{
        if(response.estado){
          this.servicio.showToast(response.mensaje, 2000);
          this.navCtrl.navigateRoot('/menu');
        }else{
          this.servicio.showToast(response.mensaje, 2000);
        }
      }
    );

  }

  cancelar(){
    this.navCtrl.back();
  }

}
