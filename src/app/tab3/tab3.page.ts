import { Component } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Asistencia } from '../interfaces/asisntecia.interface';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  alumno: string = '';
  isLoading: boolean = false;
  asistenciasAlumno: Asistencia[] = [];
  constructor(private dlocalService: DataLocalService, private storage: Storage) {
    this.esUsuarioValido().then(value => this.alumno = value);
  }
  ionViewWillEnter() {
    this.isLoading = true;
    setTimeout(() => {
      this.dlocalService.loadMovies();
      this.asistenciasAlumno = this.dlocalService._asistencias
      this.isLoading = false;
    }, 1500);
  }

  async esUsuarioValido() {
    const name = await this.storage.get('nombreUsuario');
    return name;
  }
}
