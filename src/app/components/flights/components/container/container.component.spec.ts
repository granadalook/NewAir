import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { SearchComponent } from '../search/search.component';
import { JourneyService } from '../../../../core/services/journey/journey.service';
import { FlightsService } from 'src/app/core/services/flights/flights.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerComponent, SearchComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [JourneyService, FlightsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
