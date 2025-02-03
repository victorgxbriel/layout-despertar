import { Component } from '@angular/core';
import { ListNewsComponent } from "../../components/list-news/list-news.component";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ListNewsComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsList = [
    {
      title: 'Teste 1',
      description: 'testando o card',
      tags: [
        'tag1',
        'tag2'
      ],
      imageUrl: ''
    },
    {
      title: 'Teste 2',
      description: '',
      tags: [
        'tag3',
        'tag4'
      ],
      imageUrl: ''
    }
  ]
}
