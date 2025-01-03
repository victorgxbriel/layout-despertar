import { Component } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CardInformationComponent } from "../../components/card-information/card-information.component";

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [MapComponent, CardInformationComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  
}
