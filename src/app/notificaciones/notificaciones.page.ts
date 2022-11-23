import { Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(public pushService:PushService) { 
         }

  async ngOnInit() {
    await this.pushService.cargarMensajes();
    await this.pushService.init();
  }



}
