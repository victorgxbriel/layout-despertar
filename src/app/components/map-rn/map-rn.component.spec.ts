import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRnComponent } from './map-rn.component';

describe('MapRnComponent', () => {
  let component: MapRnComponent;
  let fixture: ComponentFixture<MapRnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapRnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
