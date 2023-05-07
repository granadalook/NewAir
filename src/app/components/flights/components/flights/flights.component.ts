import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConversionService } from 'src/app/core/services/conversion/conversion-service.service';
import { IJourney } from 'src/app/models/journey.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  @Input() journeys?: Array<IJourney>;
}
