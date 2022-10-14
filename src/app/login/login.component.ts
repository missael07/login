import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { users } from '../data/user.data';
import { Storage } from '@ionic/storage-angular';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginUser = {
    email: 'test1@gmail.com',
    password: 'abc1234'
  };

  users: any[] = users.users;
  constructor(private navCtrl: NavController, private storage: Storage, private dlocalService: DataLocalService) {
    console.log(users.users)
  }

  ngOnInit() {}

  async login( fLogin: NgForm ) {

    if ( fLogin.invalid ) { return; }

    const user = this.users.filter( usr => usr.user == this.loginUser.email && usr.password == this.loginUser.password)
    if( !user ) {
      this.dlocalService.presentToast('Usuario/Contraseña erroneas');
      return;
    }
    this.storage.set('rol', user[0].rol);
    this.storage.set('nombreUsuario', user[0].name);

    if(user[0].rol === 'alumno'){
      
      this.navCtrl.navigateRoot( '/main/tabs/tab2', { animated: true } );
    }
    else {    
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    }
  }

}
