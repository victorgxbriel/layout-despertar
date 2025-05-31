import { Component, computed, signal } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CardInformationComponent } from "../../components/card-information/card-information.component";
import { ArticleComponent } from "../../components/article/article.component";
import { MapRnComponent } from "../../components/map-rn/map-rn.component";
import { IDadosJSON, IDadosMunicipio } from '../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CardFilterComponent } from "../../components/card-filter/card-filter.component";

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [MapComponent, CardInformationComponent, ArticleComponent, MapRnComponent, CardFilterComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  mapCode = signal<string>("rn")
  dadosMunicipio = signal<IDadosMunicipio | undefined>(undefined);
  mapCodeUp = computed(() => this.mapCode().toUpperCase());

  isLoadingData = signal(false); // Para feedback de carregamento

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const navigation = router.getCurrentNavigation()
    if(navigation && navigation.extras && navigation.extras.state) this.dadosMunicipio.set(navigation.extras.state['selectedDistrict'])
  }

  updateMapCode(newMapCode: string): void {
    this.mapCode.set(newMapCode)
  }

  onSelectMunicipio(district: IDadosMunicipio) {
    this.dadosMunicipio.set(district)
  }

  private fetchMunicipioData(estadoCode: string, cidadeDistrict: string): void {
    this.isLoadingData.set(true);
    this.dadosMunicipio.set(undefined); // Limpa dados anteriores enquanto carrega

    this.http.get<IDadosJSON[]>(`assets/data/${estadoCode}.json`).subscribe({
      next: (cidadesDoEstado) => {
        const cidadeEncontrada = cidadesDoEstado.find(c => c.district === cidadeDistrict);
        if (cidadeEncontrada) {
          console.log('[DataComponent] fetchMunicipioData: ENCONTRADO. Setando dadosMunicipio com:', cidadeEncontrada.details);
          this.dadosMunicipio.set(cidadeEncontrada.details);
          console.log('Dados do município carregados:', this.dadosMunicipio());
        } else {
          console.warn(`Município com district '${cidadeDistrict}' não encontrado em '${estadoCode}.json'`);
          console.warn(`[DataComponent] fetchMunicipioData: Cidade ${cidadeDistrict} NÃO encontrada.`);
          this.dadosMunicipio.set(undefined);
        }
        this.isLoadingData.set(false);
      },
      error: (err) => {
        console.error(`Erro ao carregar dados para ${estadoCode}/${cidadeDistrict}:`, err);
        this.isLoadingData.set(false);
      }
    });
  }

  onFilterDataChange(selection: { estado: string | null; cidade: string | null }): void {
    console.log('[DataComponent] onFilterDataChange RECEBEU:', selection);
    console.log('Filtro selecionado no DataComponent:', selection);

    if (selection.estado) {
      this.mapCode.set(selection.estado); // Atualiza o código do mapa (para o MapRnComponent)

      if (selection.cidade) {
        // Se um estado e uma cidade foram selecionados, busca os dados desse município
        this.fetchMunicipioData(selection.estado, selection.cidade);
      } else {
        // Se apenas um estado foi selecionado (sem cidade, ou cidade desmarcada), limpa os dados do município
        this.dadosMunicipio.set(undefined);
        console.log('Nenhuma cidade selecionada, limpando dados do município.');
      }
    } else {
      // Se nenhum estado foi selecionado (ou foi desmarcado)
      // Você pode definir um comportamento padrão, como voltar para RN ou limpar tudo
      this.mapCode.set("rn"); // Volta para o mapa padrão RN, ou poderia ser um mapa nacional
      this.dadosMunicipio.set(undefined); // Limpa os dados do município
      console.log('Nenhum estado selecionado, resetando para o padrão ou limpando dados.');
    }
  }
}
