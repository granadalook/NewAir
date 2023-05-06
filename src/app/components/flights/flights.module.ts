import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { SearchRoutingModule } from './flights,routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [SearchComponent],
  imports: [
    SearchRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FlightsModule {}
