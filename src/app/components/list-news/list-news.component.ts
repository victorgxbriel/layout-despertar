import { Component, Input } from '@angular/core';
import { CardNewsComponent } from '../card-news/card-news.component';
import { NewsCard } from '../../core/types/types';

@Component({
  selector: 'app-list-news',
  standalone: true,
  imports: [CardNewsComponent],
  templateUrl: './list-news.component.html',
  styleUrl: './list-news.component.css'
})
export class ListNewsComponent {
  @Input() newsList!: NewsCard[]
  @Input() currentPage!: number
  @Input() totalPage!: number
}
