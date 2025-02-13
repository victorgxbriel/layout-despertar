import { Component, Input } from '@angular/core';
import { NewsCard } from '../../core/types/types';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-news',
  standalone: true,
  imports: [ MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './card-news.component.html',
  styleUrl: './card-news.component.css'
})
export class CardNewsComponent {
  @Input() news!: NewsCard
}
