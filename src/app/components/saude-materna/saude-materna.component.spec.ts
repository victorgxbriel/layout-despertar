import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaudeMaternaComponent } from './saude-materna.component';

describe('SaudeMaternaComponent', () => {
  let component: SaudeMaternaComponent;
  let fixture: ComponentFixture<SaudeMaternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaudeMaternaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaudeMaternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
