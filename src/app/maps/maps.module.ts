import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MiniMapComponent,
    FullScreenComponent,
    MarkersComponent,
    ZoomRangeComponent,
    PropertiesComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MapsModule { }
