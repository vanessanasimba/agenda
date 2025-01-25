import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AccesoService {
  server: string="http://localhost:8080/septimoNivel/ws_agenda_ionic/agenda.php";

  constructor(
    public ToastCtrl: ToastController,
    public http: HttpClient
  ) { }

  postData(body:any){
    let  head = new HttpHeaders({'Content-Type':'application/json, charsset:utf8'});
    let options = {
      headers: head
    };
    return this.http.post(this.server, JSON.stringify(body), options);

  }

  async showToast(mensaje: string, tiempo: number){
    const toast = await this.ToastCtrl.create({
      message: mensaje,
      duration: tiempo,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }
  async createSesion(id:string, valor:string){
    await Preferences.set({
      key:id,
      value:valor
      });

  }

  async getSession(id: string)
  {
    const item = await Preferences.get({
      key: id
    });
    return item.value
  }

  async closeSession()
  {
    await Preferences.clear();
  }
}
