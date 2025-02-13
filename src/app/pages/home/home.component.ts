import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapComponent } from "../../components/map/map.component";
import { MatButtonModule } from '@angular/material/button';
import { CardNewsComponent } from "../../components/card-news/card-news.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MapComponent, MatButtonModule, CardNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  news = {
    title: 'Estudo Revela Impactos das Mudanças Climáticas',
    description: 'Pesquisadores publicam um estudo detalhado que mostra como o aumento do nível do mar pode afetar as regiões costeiras no Brasil.',
    tags: ['ciência', 'clima', 'meio ambiente'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60'
  }
}
