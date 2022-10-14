import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Asistencia } from '../interfaces/asisntecia.interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  _asistencias: Asistencia[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.loadMovies();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    })
    toast.present();
  }

  registrarAsistencia(asistencia: Asistencia) {
    let exists = false;
    let message = '';

    exists = !!this._asistencias.find(f => f.name === asistencia.name && `${f.date.getDay()}/${f.date.getMonth()}/${f.date.getFullYear()}` === `${asistencia.date.getDay()}/${asistencia.date.getMonth()}/${asistencia.date.getFullYear()}`);
    if (!exists) {
      this._asistencias.push(asistencia)
      message = 'Asistencia registrada correctamente';      
      this.presentToast(message);
      if (this._asistencias.length === 0) {
        this.storage.remove('asistencias');
        return;
      } else {
        this.storage.set('asistencias', this._asistencias);
      }
    }
    return !exists;
  } 

  async loadMovies() {
    const asistencias = await this.storage.get('asistencias');
    this._asistencias = asistencias || [];
    return this._asistencias;
  }

}
