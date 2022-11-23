import { Component, OnInit } from '@angular/core';
import { PushService } from './services/push.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  result: string;

  constructor(private pushService:PushService, private storage:Storage) {
    this.pushService.init();
    this.pushService.OneSignalInit();
  
    
  }
 async ngOnInit() {
     this.pushService.guardarMensajes();
  }



}
