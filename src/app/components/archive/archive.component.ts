import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface FileItem {
  name: string;
  fileName: string;
}

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {
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
