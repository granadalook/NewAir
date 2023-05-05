import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { SearchRoutingModule } from './flights,routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [SearchRoutingModule, CommonModule],
})
export class FlightsModule {}
