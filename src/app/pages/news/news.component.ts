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
      title: 'Estudo Revela Impactos das Mudanças Climáticas',
      description: 'Pesquisadores publicam um estudo detalhado que mostra como o aumento do nível do mar pode afetar as regiões costeiras no Brasil.',
      tags: ['ciência', 'clima', 'meio ambiente'],
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Tecnologia de IA Revoluciona Diagnósticos na Saúde',
      description: 'Hospitais estão adotando soluções de inteligência artificial para melhorar a precisão dos diagnósticos e agilizar tratamentos.',
      tags: ['tecnologia', 'saúde', 'inovação'],
      imageUrl: ''
    },
    {
      title: 'Brasil Debate Novas Políticas Econômicas',
      description: 'Líderes políticos se reúnem para discutir reformas que podem impactar o cenário econômico nacional nos próximos meses.',
      tags: ['política', 'economia', 'Brasil'],
      imageUrl: ''
    },
    {
      title: 'Descoberta Científica Oferece Novo Tratamento para Doenças Raras',
      description: 'Um grupo de pesquisadores anunciou um avanço que pode transformar o tratamento de condições consideradas incuráveis.',
      tags: ['ciência', 'saúde', 'pesquisa'],
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Festival Cultural Agita as Ruas de São Paulo',
      description: 'Milhares de pessoas celebram a diversidade cultural com apresentações de música, dança e teatro em um festival ao ar livre.',
      tags: ['cultura', 'evento', 'São Paulo'],
      imageUrl: ''
    },
    {
      title: 'Mercado Financeiro Registra Alta em Meio à Incerteza Global',
      description: 'Investidores demonstram otimismo e o mercado financeiro apresenta uma tendência de alta, mesmo com os desafios econômicos internacionais.',
      tags: ['finanças', 'economia', 'mercado'],
      imageUrl: 'https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Avanços em Energias Renováveis Ganham Espaço no Setor Industrial',
      description: 'Empresas investem em tecnologias sustentáveis, impulsionando o crescimento das energias renováveis e reduzindo a pegada de carbono.',
      tags: ['energia', 'sustentabilidade', 'tecnologia'],
      imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=60'
    }
  ];  
}
