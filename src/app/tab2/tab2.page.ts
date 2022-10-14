import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataLocalService } from '../services/data-local.service';
import { Asistencia } from '../interfaces/asisntecia.interface';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage-angular';
// import { Camera, CameraOptions } from '';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user: string = '';
  constructor(private navCtrl: NavController,private dlocalService: DataLocalService, private barcodeScanner: BarcodeScanner, private storage: Storage) {
    this.esUsuarioValido().then(value => this.user = value);
  }

  verAsistencias(){
    this.navCtrl.navigateRoot('main/tabs/tab3');
  }
  async registrarAsistencia(){
    this.barcodeScanner.scan().then(barcodeData => {
      const asistencia: Asistencia = {
      name: this.user,
      date: new Date(barcodeData.text),
    }
    
    this.dlocalService.registrarAsistencia(asistencia);
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      const asistencia: Asistencia = {
        name: this.user,
        date: new Date(),
      }
      
      this.dlocalService.registrarAsistencia(asistencia);
        console.log('Error', err);
    });
  
  }

  async esUsuarioValido() {
    const name = await this.storage.get('nombreUsuario');
    return name;
  }
}
