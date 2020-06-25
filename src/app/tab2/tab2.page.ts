import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ideas: string[] = ['Spiderman','Avenger','El señor de los anillos', 'La vida es bella'];
  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
      constructor(private moviesS: MoviesService,
        public modalController: ModalController) {

        }




  onSearchChange(event){
    const valor: string = event.detail.value;
    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesS.buscarPelicula(valor).subscribe(resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  
  async detalle(id: string){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    return await modal.present();

  }

}
