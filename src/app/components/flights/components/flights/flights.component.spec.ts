import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsComponent } from './flights.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsComponent],
      providers: [],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
