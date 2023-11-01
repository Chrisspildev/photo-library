import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosHomeComponent } from './photos-home/photos-home.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosHomeComponent
  },
  {
    path: 'singlepage/:id',
    component: SinglePageComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
