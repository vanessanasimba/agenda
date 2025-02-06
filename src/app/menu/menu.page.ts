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
  contactos:any=[];


  constructor(
    private servicio: AccesoService,
    private navCtrl : NavController,
    private router: Router
  ) {
    this.servicio.getSession('persona').then((res:any)=>{
      this.nombre = res;
    });
    this.servicio.getSession('idpersona').then((res:any)=>{
      this.codigo=res;
      this.lcontactos();
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



  lcontactos(){
    let datos= {
      "accion": 'consultar',
      "codigo":this.codigo
    }
    this.servicio.postData(datos).subscribe(
      (response:any)=>{
        if(response.estado){
          this.contactos = response.contactos;
          console.log(this.contactos);
        }else{
          this.servicio.showToast(response.mensaje, 2000);
        }
      },
      (error)=>{
        this.servicio.showToast('Error de conexión', 2000);
      }
    );
  }
  nuevo(){
    this.navCtrl.navigateForward('/contactos');
  }

  editar(cod_contacto:any){
    this.navCtrl.navigateRoot('/acontacto');
    this.servicio.createSesion('cod_contacto', cod_contacto);
  }
  eliminar(cod_contacto:any){
    this.navCtrl.navigateRoot('/econtacto');
    this.servicio.createSesion('cod_contacto', cod_contacto);
  }

}
