import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshowpares',
  templateUrl: './slideshowpares.component.html',
  styleUrls: ['./slideshowpares.component.scss'],
})
export class SlideshowparesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpt = {
    slidesPerView : 2.5,
    freeMode : true,
    slidesPerColumn : 2,
    // spaceBetween: -40,
    // slidesOffsetBefore: -10,
    slidesPerColumnFill: 'row'
  }
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
  }

  async verDetalle(id: string){
    
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    return await modal.present();
  }


}
