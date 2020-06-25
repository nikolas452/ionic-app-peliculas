import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  pelicualesRecientes : Pelicula[] = [];
  populares : Pelicula[] = [];


  constructor(private movieS: MoviesService) {}
  
  
ngOnInit(){
    this.movieS.getFeature().subscribe(resp => this.pelicualesRecientes = resp.results);

    this.movieS.getPopulares().subscribe( resp => this.populares.push(...resp.results) );
  }
  
  cargarMas(){
    this.movieS.getPopulares().subscribe( resp => {
      let aux = [...this.populares, ...resp.results];  
      this.populares = aux;
     });
}

}
