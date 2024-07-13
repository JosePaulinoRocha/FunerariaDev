import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosServices } from 'src/app/Servicios/Usuarios.service';

interface User {
  userId: number;
  fullName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class UserModalComponent implements OnInit {
  @Input() user: User = {
    userId: 0,
    fullName: '',
    phone: '',
    email: '',
    isAdmin: false
  };
  @Input() isEditMode: boolean = false;

  constructor(private modalController: ModalController, private userService: UsuariosServices) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveUser() {
    if (this.isEditMode) {
      this.userService.updateUser(this.user).subscribe(response => {
        console.log('User updated:', response);
        console.log("estos son los datos: ", this.user)
        this.modalController.dismiss(this.user, 'edit');
      }, error => {
        console.error('Error updating user:', error);
      });
    } else {
      this.userService.addUser(this.user).subscribe(response => {
        console.log('User added:', response);
        console.log("estos son los datos: ", this.user)
        this.modalController.dismiss(this.user, 'add');
      }, error => {
        console.error('Error adding user:', error);
      });
    }
  }
}
