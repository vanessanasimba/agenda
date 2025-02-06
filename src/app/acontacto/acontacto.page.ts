import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-acontacto',
  templateUrl: './acontacto.page.html',
  styleUrls: ['./acontacto.page.scss'],
  standalone: false
})
export class AcontactoPage implements OnInit {
  cod_contacto:string = "";
  txt_nombre:string = "";
  txt_telefono:string = "";
  txt_correo:string = "";
  txt_apellido:string = "";
  mensaje:string ="";


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
  guardar(){
    let datos={
      "accion": 'acontacto',
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "telefono": this.txt_telefono,
      "mail": this.txt_correo,
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
    this.navCtrl.back();
  }
  verificarNumero(){}
}
