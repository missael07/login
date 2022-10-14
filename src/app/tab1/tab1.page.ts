import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user: string = '';
  title = 'app';
  elementType = 'text';
  value = '';
  width = 'width: 100%'
  constructor( private storage: Storage) {
    this.esUsuarioValido().then(value => this.user = value);
  }

  generarQR(){
    this.value = new Date().toDateString();
  }

  async esUsuarioValido() {
    const name = await this.storage.get('nombreUsuario');
    return name;
  }
 
}
