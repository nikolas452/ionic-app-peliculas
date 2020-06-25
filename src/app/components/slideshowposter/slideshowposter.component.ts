import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshowposter',
  templateUrl: './slideshowposter.component.html',
  styleUrls: ['./slideshowposter.component.scss'],
})
export class SlideshowposterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  slideOpt = {
    slidesPerView : 2.5,
    freeMode : true,
    // slidesPerColumn : 2,
    spaceBetween: -40,
    slidesPerColumnFill: 'row'
  }
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string){
    
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {id}
    });
    return await modal.present();
  }


}
