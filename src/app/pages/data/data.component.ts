import { Component } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  
}
