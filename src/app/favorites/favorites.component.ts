import { Component, OnInit } from '@angular/core';
import { ImageI } from '../api-photos.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  localStorageArray: ImageI[] = [];


  constructor() { }

  ngOnInit(): void {
    const fav = localStorage.getItem('photo')
    this.localStorageArray = fav ? JSON.parse(fav) : [];
  }

}
