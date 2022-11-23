import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage';
import { OSNotificationPayload } from '@awesome-cordova-plugins/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private _storage: Storage | null = null;

  mensajes: OSNotificationPayload[]=[
    // {

    // }
];

  constructor(private storage:Storage) { 
    this.init();
    this.cargarMensajes();
  }
  
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  OneSignalInit() {
    OneSignal.setAppId('6daa61c3-a98f-4ec8-9642-87960645983d');
 
    OneSignal.setNotificationOpenedHandler(async (notification) => {
      console.log('Notificacion Abierta: ', notification);
      

    });
 
    OneSignal.setNotificationWillShowInForegroundHandler(async (notification) => {
      console.log('Notificacion recibida: ', notification);
      this.notificacionRecibida(notification);
    });
 
    OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
      console.log('Usuario Acepto las notificaciones: ', accepted);
    });
  }

  async notificacionRecibida(notification: OSNotification){
     const payload =  notification.rawPayload;
     const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.rawPayload);
     if (existePush){
        return;
      }
      this.mensajes.unshift(payload);

    await this.cargarMensajes();
    this.guardarMensajes();
  }

  guardarMensajes(){
    this.storage.set('mensajes', this.mensajes);
  }

async cargarMensajes(){
  this.mensajes = await this.storage.get('mensajes') || [];
 }



}

