import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { GalleryImage } from '../models/gallery-image';
import { Upload } from '../models/upload';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private filePath = '/uploads';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase) { }

  uploadFile(upload: Upload) {
    try {
      const ref = this.storage.ref(`${this.filePath}/${upload.file.name}`);
      const task = ref.put(upload.file);

      this.uploadPercent = task.percentageChanges();
      this.uploadPercent.subscribe(v => upload.progress = v);

    // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(
            url => {
              // console.log(`Url => ${url}`);
              upload.name = upload.file.name;
              upload.url = url;
              this.saveFileData(upload);
            }
          );
        })
      )
      .subscribe()
    }
    catch(error) {
      console.log(error);
    }
  }

  private saveFileData(upload: Upload) {
    this.db.list(`${this.filePath}/`).push(upload);
    // console.log('File saved!: ' + upload.url);
  }
}
