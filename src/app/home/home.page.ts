import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { CuentaPage } from '../cuenta/cuenta.page';
import { RclavePage } from '../rclave/rclave.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_usuario: string="";
  txt_clave: string="";
  intentos: number=0;

  constructor(
    private loadingCtrl: LoadingController,
    private acceso : AccesoService,
    private navCtrl : NavController,
    private modalCtrl: ModalController
  ) {}

  login(){
    let datos = {
      accion: 'login',
      usuario: this.txt_usuario,
      clave: this.txt_clave
    }
    this.acceso.postData(datos).subscribe((resp:any) => {
        if(resp.estado){
          this.acceso.showToast('Encontró persona', 3000);
          console.log(resp.persona);
          this.acceso.createSesion('idpersona',resp.persona.codigo);
          this.acceso.createSesion('persona', resp.persona.nombre);
          sessionStorage.setItem('idpersona', resp.persona.codigo)
          this.navCtrl.navigateRoot('/menu');
        }else{
          this.intentos +=1;
          console.log(this.intentos);
          if (this.intentos >= 2){
            // verificar si el usuario exite para bloquear
            let datosC = {
              accion: 'vcedula',
              cedula: this.txt_usuario
            }
            this.acceso.postData(datosC).subscribe((resp:any) => {
              if(resp.estado){
                this.bloquearUsuario();
              }
            });
          } 
        }
      });
  }

  async crear(){
    const moda = await this.modalCtrl.create({
      component: CuentaPage
    });
    return await moda.present();
  }
  async recuperar(){
    const moda = await this.modalCtrl.create({
      component: RclavePage
    });
    return await moda.present();

  }

  bloquearUsuario(){
    let datos = {
      accion: 'bloqueo',
      cedula: this.txt_usuario
    }

    this.acceso.postData(datos).subscribe((resp:any) => {
      if(resp.estado){
        this.acceso.showToast('El usuario se bloqueo recupere la clave', 3000);
      }
    });
  }

}
