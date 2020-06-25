import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowposterComponent } from './slideshowposter/slideshowposter.component';
import { SlideshowparesComponent } from './slideshowpares/slideshowpares.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({
  declarations: [SlideshowBackdropComponent, SlideshowposterComponent,SlideshowparesComponent,DetalleComponent],
  imports: [
    CommonModule, IonicModule, PipesModule
  ],
  exports: [SlideshowBackdropComponent, SlideshowposterComponent,SlideshowparesComponent,DetalleComponent]
})
export class ComponentsModule { }
