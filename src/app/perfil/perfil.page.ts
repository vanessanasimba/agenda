import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  codigo: string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_correo: string = "";
  txt_cedula: string = "";

  constructor(
    private servicio: AccesoService
  ) { 
    this.codigo = sessionStorage.getItem('idpersona') || ''; 
    console.log('PERFIL');
    console.log(this.codigo);
    this.cargarPerfil(this.codigo);
  }

  ngOnInit() {
  }
  

  cargarPerfil(codigo: string) {
    let datos = {
      accion: 'dato',
      codigo: codigo
    }
    console.log(codigo);
    this.servicio.postData(datos).subscribe((resp:any) => {
      if(resp.estado){
        console.log(resp.persona);
        this.txt_apellido = resp.persona.apellido;
        this.txt_nombre = resp.persona.nombre;
        this.txt_correo = resp.persona.correo;
        this.txt_cedula = resp.persona.cedula;
      }
    });
  }

  guardarCambios() {
    let datos = {
      accion: 'actualizar',
      codigo: this.codigo,
      nombre: this.txt_nombre,
      apellido: this.txt_apellido,
      correo: this.txt_correo,
      cedula: this.txt_cedula
    }
    console.log(datos);
    this.servicio.postData(datos).subscribe((resp:any) => {
      if(resp.estado){
        console.log(resp.persona);
        this.servicio.showToast('Datos actualizados', 3000);
      }
    });

  }

}
