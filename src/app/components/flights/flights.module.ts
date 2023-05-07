import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { SearchRoutingModule } from './flights,routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { FlightsComponent } from './components/flights/flights.component';
import { StopsComponent } from './components/stops/stops.component';
import { FlightCardComponent } from './components/flights/flight-card/flight-card.component';
@NgModule({
  declarations: [
    SearchComponent,
    ContainerComponent,
    FlightsComponent,
    StopsComponent,
    FlightCardComponent,
  ],
  imports: [
    SearchRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FlightsModule {}
