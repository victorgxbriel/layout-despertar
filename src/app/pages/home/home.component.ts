import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
