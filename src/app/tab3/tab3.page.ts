import { Component } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  peliculas: PeliculaDetalle[]= [];
  generos: Genre[] = [];
  favoritosGenero: any[] = [];
  
  constructor(private dataL: DataLocalService,
              private moviesS: MoviesService) {}

  // Cada vez q se entra a la pagina
  async ionViewWillEnter(){
    this.peliculas = await this.dataL.cargarFavoritos();
    this.generos = await this.moviesS.caragarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }


  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritosGenero = [];

    generos.forEach(genero => {
      this.favoritosGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find(genre => genre.id === genero.id); 
        })
      })
    });
    console.log(this.favoritosGenero);
  }


}
