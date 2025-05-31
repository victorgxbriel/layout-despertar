import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
// Angular Material Modules
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'; // Para ícones, se desejar
import { MatButtonModule } from '@angular/material/button'; // Para os botões de download
import { FileItem } from '../archive/archive.component';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-saude-materna',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './saude-materna.component.html',
  styleUrl: './saude-materna.component.css'
})
export class SaudeMaternaComponent implements OnInit, OnDestroy {

  isMobileView = signal(window.innerWidth < 640);

  private breakpointSubscription: Subscription | undefined;
  private breakpointObserver = inject(BreakpointObserver); // Injeção moderna

  constructor() { }

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 639.98px)']) // Observa telas menores que 640px
      .subscribe((state: BreakpointState) => {
        this.isMobileView.set(state.matches);
        console.log('É mobile view?', this.isMobileView());
      });
  }

  ngOnDestroy(): void {
    // Cancela a subscrição para evitar vazamentos de memória
    this.breakpointSubscription?.unsubscribe();
  }

  // Função para simular download ou navegação
  navigateToMaterial(urlOrFileName: string, isExternal: boolean = false) {
    console.log(`Navegando/baixando: ${urlOrFileName}`);
    if (isExternal) {
      window.open(urlOrFileName, '_blank');
    } else {
      // Para arquivos locais, você precisaria de um caminho correto ou um serviço de download
      // window.open(`/assets/materiais/${urlOrFileName}`, '_blank');
      alert(`Simulação de download para: ${urlOrFileName}`);
    }
  }

  // Caminho base para os arquivos
 private basePath = "../../../assets/repo/";

 // Lista de arquivos, informando apenas o nome do arquivo.
 files: FileItem[] = [
   { name: '10 passos - Cuidado Obstétrico', fileName: '10_PASSOS_Cuidado_Obstétrico.pdf' },
   { name: 'Relatório México - Conferência 1975', fileName: '1975_Relatório_México_Conferência.pdf' },
   { name: 'Relatório Copenhagem - Conferência 1980', fileName: '1980_Relatório_Copenhagem_Conferência.pdf' },
   { name: 'Relatório Nairobi - Conferência 1985', fileName: '1985_Relatório_Nairobi_Conferência.pdf' },
   { name: 'Declaração Pequim - 1995', fileName: 'Declaracao_Pequim_1995.pdf'},
   { name: 'Manual dos Comitês', fileName: 'Manual dos Comitês_Mortalidade Materna.pdf'},
   { name: 'Politica Nacional - Atenção Mulher', fileName: 'Politica_Nacional_Atencao_Mulher_PNAISM_2004.pdf'},
   { name: 'Protocolo AB Mulheres', fileName: 'Protocolo_AB_Mulheres.pdf'}

 ];

 downloadFile(file: FileItem): void {
   const link = document.createElement('a');
   link.href = `${this.basePath}${file.fileName}`;
   link.download = file.name;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
 }
}
