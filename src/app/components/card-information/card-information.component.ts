import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CardInformationService } from './card-information.service';

@Component({
  selector: 'app-card-information',
  standalone: true,
  imports: [ MatCardModule, MatListModule, MatDividerModule ],
  templateUrl: './card-information.component.html',
  styleUrl: './card-information.component.css'
})
export class CardInformationComponent implements OnInit, OnChanges {
  @Input() mapCode!: string
  service = inject(CardInformationService)
  
  ngOnInit(): void {
    this.service.reload(this.mapCode)
    console.log(this.mapCode, this.service.information().details)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["mapCode"]){
      this.service.reload(this.mapCode)
    }
  }
}
