import { Component, HostListener, OnInit } from '@angular/core';
import { ApiPhotosService, ImageI } from '../api-photos.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-photos-home',
  templateUrl: './photos-home.component.html',
  styleUrls: ['./photos-home.component.scss']
})

export class PhotosHomeComponent implements OnInit {
  page: number = 1;
  data: any;
  photos: ImageI[] = [];
  loadImage: boolean = false;
  loadImage2: boolean = false;

  constructor(
    private http: HttpClient,
    private apiPhoto: ApiPhotosService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getNewPhotos()

  }

  getNewPhotos() {
    if (this.loadImage) {
      return;
    }
    this.loadImage = true;
    this.loadImage2 = true;
    const delay = Math.floor(Math.random() * 101) + 200;
    const getPhotos = this.apiPhoto.getPhotos(this.page).subscribe(
      (response: any) => {
        if (this.photos.length) {
          setTimeout(() => {
            this.photos = this.photos.concat(response);
            getPhotos.unsubscribe();
          }, delay);
        }
        else {
          this.photos = response;
        }
        getPhotos.unsubscribe();
        setTimeout(() => {
          this.loadImage = false;
        }, 2000)
        setTimeout(() => {
          this.loadImage2 = false;
        }, 6000)

      });
  }


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.getNewPhotos();
    }
  }

  addImageToFavorites(photo: ImageI) {
    const localStorageArray = this.getFavoritesFromLocalStorage();
    console.log(localStorageArray);
    if (localStorageArray) {
      if (!localStorageArray.some((item: ImageI) => item.id === photo.id)) {
        localStorageArray.push(photo);
        this.updateFavoritesInLocalStorage(localStorageArray);
        this.toastr.success('Photo added to favorites successfully');
      } else {
        this.toastr.warning('Photo is already added to favorites');
      }
    }
    else {
      localStorageArray.push(photo);
      this.updateFavoritesInLocalStorage(localStorageArray);
      //this.toastr.success('Photo added to favorites successfully');

    }


  }

  getFavoritesFromLocalStorage() {
    const favoritesJson = localStorage.getItem('photo');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  updateFavoritesInLocalStorage(localStorageArray: ImageI[]) {
    localStorage.setItem('photo', JSON.stringify(localStorageArray));
  }






}


