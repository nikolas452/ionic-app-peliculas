import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle;
  actores: Cast[] = [];
  info = 150;
  estrella = 'star-outline'
  opcciones = {
    slidesPerView: 3.3,
    freMode: true,
    spaceBetween: -5
  }

  constructor(private moviesS: MoviesService,
    public modalController: ModalController,
    private dataL: DataLocalService) { }

   ngOnInit() {
     this.dataL.existePelicula(this.id)
     .then(existe =>  this.estrella = (existe)? 'star': 'star-outline');
     
     this.moviesS.getPeliculaDetalle(this.id).subscribe(resp => {
       this.pelicula = resp;
      });
      this.moviesS.getPeliculaActores(this.id).subscribe(resp => {
        this.actores = resp.cast;
        console.log(this.actores);
      });
    }
    
    
    
    regresar(){
      this.modalController.dismiss();
    }
    
    favorito(){
    const existe = this.dataL.guardarPelicula(this.pelicula);
    this.estrella = (existe)? 'star': 'star-outline';
  }



}
