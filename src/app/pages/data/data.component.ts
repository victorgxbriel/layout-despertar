import { Component, signal } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CardInformationComponent } from "../../components/card-information/card-information.component";
import { ArticleComponent } from "../../components/article/article.component";

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [MapComponent, CardInformationComponent, ArticleComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  mapCode = signal<string>("brasil")

  updateMapCode(newMapCode: string): void {
    this.mapCode.set(newMapCode)
  }
}
