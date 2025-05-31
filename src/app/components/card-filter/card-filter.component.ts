import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HttpClient } from '@angular/common/http';
import { IDadosBrasil, IDadosJSON, IDadosMunicipio } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.css'
})
export class CardFilterComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  filterForm: FormGroup;

  estados: IDadosBrasil[] = []
  cidades: IDadosJSON[] = []

  isLoadingEstados = false;
  isLoadingCidades = false;
   
  @Output() selectionChange = new EventEmitter<{ estado: string | null; cidade: string | null }>();

  constructor() {
    this.filterForm = this.fb.group({
      estado: ['rn'],
      cidade: [{value: null, disabled: true}]
    })
  }

  ngOnInit(): void {
    this.loadEstados();

    // ... (subscrição do estado permanece como está, ela deve emitir com cidade: null quando o estado muda)
this.filterForm.get('estado')?.valueChanges.subscribe(estadoDistrict => {
  console.log('[CardFilter] ESTADO FormControl mudou para:', estadoDistrict);
  this.filterForm.get('cidade')?.reset(null, { emitEvent: false });
  this.filterForm.get('cidade')?.disable({ emitEvent: false });
  this.cidades = [];
  
  if (estadoDistrict) {
    this.loadCidades(estadoDistrict); // Carrega cidades e habilita o select de cidade no callback
  }
  // Emite a mudança de estado, onde a cidade é explicitamente null/resetada
  const cidadeValueAposResetEstado = this.filterForm.get('cidade')?.value; // Deve ser null
  console.log('[CardFilter] EMITINDO após mudança de ESTADO:', { estado: estadoDistrict, cidade: cidadeValueAposResetEstado });
  this.selectionChange.emit({ estado: estadoDistrict, cidade: cidadeValueAposResetEstado });
});

// AJUSTE AQUI para a subscrição da CIDADE:
this.filterForm.get('cidade')?.valueChanges.subscribe(cidadeDistrictValue => {
  // cidadeDistrictValue é o valor mais recente e correto do select de cidade
  if (cidadeDistrictValue === null || cidadeDistrictValue === undefined) {
    // Se a cidade for resetada para null (ex: por uma lógica de deseleção),
    // ainda queremos emitir essa mudança.
    console.log('[CardFilter] Cidade FormControl mudou para (null/undefined):', cidadeDistrictValue);
  } else {
    console.log('[CardFilter] Cidade FormControl mudou para:', cidadeDistrictValue);
  }
  
  const estadoAtual = this.filterForm.get('estado')?.value;

  // Emite diretamente com o valor recebido pelo valueChanges da cidade
  console.log('[CardFilter] EMITINDO após mudança de CIDADE:', { estado: estadoAtual, cidade: cidadeDistrictValue });
  this.selectionChange.emit({ estado: estadoAtual, cidade: cidadeDistrictValue });
  
  // NÃO chame this.emitSelection() aqui, pois ele poderia ler um valor ligeiramente defasado do form group.
  // A chamada acima já faz o trabalho com os dados mais corretos.
});

  }

  loadEstados(): void {
    this.isLoadingEstados = true;
    this.http.get<IDadosBrasil[]>('assets/data/brasil.json').subscribe({
      next: (data) => {
        this.estados = data;
        this.isLoadingEstados = false;
        // Após carregar os estados, se 'rn' estiver definido, carrega as cidades do RN
        if (this.filterForm.get('estado')?.value === 'rn') {
          this.loadCidades('rn');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar estados:', err);
        this.isLoadingEstados = false;
      }
    });
  }

  loadCidades(estadoDistrict: string): void {
    if (!estadoDistrict) return;
    this.isLoadingCidades = true;
    this.filterForm.get('cidade')?.disable();
    this.http.get<IDadosJSON[]>(`assets/data/${estadoDistrict}.json`).subscribe({
      next: (data) => {
        this.cidades = data;
        this.isLoadingCidades = false;
        this.filterForm.get('cidade')?.enable();
      },
      error: (err) => {
        console.error(`Erro ao carregar cidades para ${estadoDistrict}:`, err);
        this.cidades = []; // Limpa cidades em caso de erro
        this.isLoadingCidades = false;
        this.filterForm.get('cidade')?.disable();
      }
    });
  }

  emitSelection(): void {
    if (this.filterForm.valid) {
      const { estado, cidade } = this.filterForm.value;
      this.selectionChange.emit({ estado, cidade });
    } else {
       // Se quiser emitir mesmo se a cidade não estiver selecionada, mas o estado sim:
       const estado = this.filterForm.get('estado')?.value;
       this.selectionChange.emit({ estado: estado, cidade: null });
    }
  }
}
