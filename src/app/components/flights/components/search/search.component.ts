import { Component } from '@angular/core';
import { IFlightsResponse } from 'src/app/models/response.model';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { JourneyService } from 'src/app/core/services/journey/journey.service';
import { IDataForm } from 'src/app/models/dataForm.model';
import { IJourney } from 'src/app/models/journey.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  flights!: Array<IFlightsResponse>;
  journeys!: Array<IJourney>;
  departures!: Array<string>;
  arrivals!: Array<string>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private journeyService: JourneyService
  ) {}

  formSearh: UntypedFormGroup = this.formBuilder.group(
    {
      origin: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
    },
    { validator: this.sameValueValidator }
  );

  sameValueValidator(control: FormGroup) {
    const originValue = control.get('origin')!.value;
    const destinationValue = control.get('destination')!.value;
    return originValue === destinationValue ? { sameValues: true } : null;
  }

  getJourney(data: IDataForm): void {
    this.journeyService.get(data.origin, data.destination).subscribe((resp) => {
      this.journeys = resp;
    });
  }
}
