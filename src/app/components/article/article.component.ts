import { Component, Input } from '@angular/core';
import { IDadosMunicipio } from '../../shared/interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() mapCode!: string
  @Input() dadosMunicipio!: IDadosMunicipio
  constructor() {
    console.log('d', this.mapCode)
  }
}
