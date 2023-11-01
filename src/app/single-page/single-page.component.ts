import { Component, OnInit } from '@angular/core';
import { ImageI } from '../api-photos.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  photo: ImageI | null = null

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      const favorites = localStorage.getItem('photo');
      console.log(favorites);
      const localStorageArray: ImageI[] = favorites ? JSON.parse(favorites) : [];
      console.log(localStorageArray);
      this.photo = localStorageArray.filter((item) => item.id === params['id'])[0];
      console.log(this.photo);
    })
  }

  removePhotoFromFavorites(photo: any) {
    console.log(photo);
    const favorites = localStorage.getItem('photo');
    const localStorageArray: ImageI[] = favorites ? JSON.parse(favorites) : [];
    const filteredArray = localStorageArray.filter((item) => item.id !== photo['id']);
    console.log(filteredArray);
    localStorage.setItem('photo', JSON.stringify(filteredArray));
    this.toastr.success('Photo removed from favorites');

  }

}
