import { Component, Input } from '@angular/core';
import { IFlight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss'],
})
export class StopsComponent {
  @Input() flights?: Array<IFlight>;
}
