import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JourneyService } from 'src/app/core/services/journey/journey.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IJourney } from 'src/app/models/journey.model';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let journeyService: JourneyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [JourneyService],
    }).compileComponents();
    journeyService = TestBed.inject(JourneyService);

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get journeys for origin and destination', () => {
    const data = { origin: 'MAD', destination: 'PEI' };
    const journeys: Array<IJourney> = [
      {
        flights: [],
        origin: 'MAD',
        destination: 'PEI',
        price: 100,
      },
    ];
    spyOn(journeyService, 'get').and.returnValue(of(journeys));

    component.getJourney(data);

    expect(journeyService.get).toHaveBeenCalledWith(
      data.origin,
      data.destination
    );
    expect(component.journeys).toEqual(journeys);
  });
});
