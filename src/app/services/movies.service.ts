import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const url = environment.url;
const apiKey = environment.apiKey;



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularePages = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = url + query ;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`
    console.log(query);
    return this.http.get<T>(query);
  }

  getFeature(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    (mes < 10)? mesString = '0' + mes : mesString = mes;

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares(){
    this.popularePages++;
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?sort_by=popularity.desc&page=${this.popularePages}`);
  }

  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getPeliculaActores(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }


  buscarPelicula(texto: string){
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  caragarGeneros(): Promise<Genre[]>{
    return new Promise( resolve => {

      this.ejecutarQuery<Genre[]>(`/genre/movie/list?a=1`)
        .subscribe(resp => {
          this.generos = resp['genres'];
          resolve(this.generos);
        });
    });
  }







}
