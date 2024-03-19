import { Component } from '@angular/core';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { CameraOptions } from '@ionic-native/camera'; // camera plugin
import {  CameraPhotoService } from '../services/camera-photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  photos: any[] = [];
  camera: any;
  result: any;
  base64Image: any;
  
 
  image:any
  // capturedPhoto: string;
  constructor(    public photoService:  CameraPhotoService) {}

 
  options = {                  //camera plugin start
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600,
  };
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    };
    this.camera.getPicture(options).then(
      (imageData: string) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();

    const capturedPhoto = await Camera.getPhoto({
      //https://base64-viewer.onrender.com/
      resultType: CameraResultType.Base64, // Set the resultType to Base64
      source: CameraSource.Camera,
      quality: 100,
    });

    let image:any = capturedPhoto.base64String; // image no source code or path che
    let data = 'data:image/jpeg;base64,'; //base 64 thi apde image show kari sakiye , data + imageurl = https://base64-viewer.onrender.com/ thi joi sako image
    console.log(data);
     this.result = data.concat(image); // proper image ni link generate karse
    console.log(this.result);
  }
 
}
