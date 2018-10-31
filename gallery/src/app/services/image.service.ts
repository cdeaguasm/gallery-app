import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { GalleryImage } from '../models/gallery-image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  private uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { 
      this.afAuth.authState.subscribe(auth => {
        if(auth !== undefined && auth !== null){
          this.uis = auth.uid;
        }
      });
    }

  getImages(): Observable<GalleryImage[]> {
    return this.db.list("uploads").valueChanges();
  }
}
