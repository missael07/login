import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  rol: string = '';
  constructor( private navCtrl: NavController, private storage: Storage ) {
    this.obtenerRolUsuario().then(value => this.rol = value);
  }

  logOut(){
    this.storage.remove('rol');
    this.storage.remove('nombreUsuario');
    this.navCtrl.navigateRoot('');
  }

  async obtenerRolUsuario(){
    return await this.storage.get('rol');
  }

}
