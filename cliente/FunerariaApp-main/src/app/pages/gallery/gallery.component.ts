import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { camera } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { PhotosService } from './../../services/photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class GalleryComponent implements OnInit {

  photos: string[] = [];

  constructor(
    private photosService: PhotosService
  ) {
    addIcons({ camera });
    this.photos = this.photosService.photos;
  }

  ngOnInit() {}

  async takePhoto() {
    await this.photosService.addNewPhoto();
    this.photos = this.photosService.photos; // actualizar la lista de fotos después de tomar una nueva
  }

}
