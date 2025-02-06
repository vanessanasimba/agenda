import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-econtacto',
  templateUrl: './econtacto.page.html',
  styleUrls: ['./econtacto.page.scss'],
  standalone: false
})
export class EcontactoPage implements OnInit {
  cod_contacto:string = "";
  txt_nombre:string = "";
  txt_telefono:string = "";
  txt_correo:string = "";
  txt_apellido:string = "";
  mensaje:string ="";

  public alertButtons = [
    {
      text: 'No',
      role: 'alert-button-cancel',
      handler: () => {
        this.cancelar();
      },
    },
    {
      text: 'Si',
      role: 'alert-button-confirm',
      handler: () => {
       this.eliminar();
      },
    },
  ];
  

  constructor(
     private servicio: AccesoService,
     private navCtrl: NavController
  ) { 
    this.servicio.getSession('cod_contacto').then((res:any)=>{
      this.cod_contacto = res;
      this.cargarDatos();
    });
  }

  ngOnInit() {
  }

  cargarDatos(){
    console.log("ingreso a cargar contacto");
    let datos = {
      "accion": 'dcontacto',
      "codigo": this.cod_contacto
    }
    this.servicio.postData(datos).subscribe(
      (response:any)=>{
        console.log(response);
        if(response.estado){
          this.txt_nombre = response.contacto.nombre;
          this.txt_telefono = response.contacto.telefono;
          this.txt_correo = response.contacto.correo;
          this.txt_apellido = response.contacto.apellido;
          this.cod_contacto = response.contacto.codigo;
        }else{
          this.servicio.showToast(response.mensaje, 2000);
        }
      }
    );
  }

  eliminar(){
    let datos = {
      "accion": 'eliminar',
      "codigo": this.cod_contacto
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
    this.navCtrl.navigateRoot('/menu');
  }

}
