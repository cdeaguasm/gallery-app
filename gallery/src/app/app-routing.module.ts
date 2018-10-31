import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadComponent } from './upload/upload.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthenticationGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthenticationGuard]},
  { path: 'image/:id', component: ImageDetailComponent, canActivate: [AuthenticationGuard]},
  { path: '', redirectTo: '/gallery', pathMatch: 'full'},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
