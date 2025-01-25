import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {
  nombre: string = "";
  codigo: string = "";

  constructor(
    private servicio: AccesoService,
    private navCtrl : NavController,
    private router: Router
  ) {
    this.servicio.getSession('persona').then((res:any)=>{
      this.nombre = res;
    });
    this.servicio.getSession('idpersona').then((res:any)=>{
      this.codigo = res;
    });
   }

  ngOnInit() {
  }

  ingPergil(){
    console.log('Ingresando a Perfil');
    console.log(this.nombre);
    console.log(this.codigo);
    sessionStorage.setItem('idpersona', this.codigo);
    this.router.navigate(['/perfil']);
  }

  cerrarSesion() {
    // Lógica para cerrar sesión, como limpiar datos almacenados
    console.log('Sesión cerrada');
    this.router.navigate(['/home']); // Redirige a la página de inicio de sesión
  }

}
