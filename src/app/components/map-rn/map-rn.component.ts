import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { IDadosJSON, IDadosMunicipio } from '../../shared/interfaces/interfaces';

interface IDistrictData {
  district: string,
  details: {
    title: string,
    description: string
  }
}

@Component({
  selector: 'app-map-rn',
  standalone: true,
  imports: [ CommonModule, TooltipComponent ],
  templateUrl: './map-rn.component.html',
  styleUrl: './map-rn.component.css'
})
export class MapRnComponent {
  @Input() mapCode!: string;
  @Output() exportMapCode = new EventEmitter<string>()
  @Output() municipioEscolhido = new EventEmitter<IDadosMunicipio>()
  svgContent!: SafeHtml
  selectedDistrict!: string | null
  dataContent!: IDadosJSON[]
  tooltipPosition = { x: 0, y: 0}
  tooltipTitle!: string
  tooltipDescription!: string
  tooltipVisible = false
  tootltipData!: IDadosMunicipio
  mapAnimationClass = ''

  http = inject(HttpClient)
  sanitizer = inject(DomSanitizer)

  ngOnInit(): void {
    if(!this.mapCode)
      this.mapCode = 'rn'
    this.loadSVG(this.mapCode)
    this.loadData(this.mapCode)
  }

  loadSVG(mapCode: string): void {
    this.mapAnimationClass = 'animate-fade-out'
    // o setTimeout foi para estabecer um tempo entre as animações
    setTimeout(() => {
      this.http.get(`../../../assets/maps/svg/${mapCode}.svg`, { responseType: 'text'}).subscribe((data) => {
        let svgData = data
       // Regex anterior:
      // svgData = svgData.replace(/<svg([^>]*)width="[^"]*"/, '<svg$1');
      // svgData = svgData.replace(/<svg([^>]*)height="[^"]*"/, '<svg$1');

      // TENTE ESTA REGEX MAIS ROBUSTA:
      // Remove width="xxx" preservando outros atributos e espaços corretamente
      svgData = svgData.replace(/(<svg[^>]*?)\s*width="[^"]*"([^>]*?>)/, '$1$2');
      // Remove height="xxx" preservando outros atributos e espaços corretamente
      svgData = svgData.replace(/(<svg[^>]*?)\s*height="[^"]*"([^>]*?>)/, '$1$2');
      
      // ***** ADICIONE ESTE CONSOLE.LOG *****
      console.log("SVG String Modificada:", svgData.substring(0, 300)); // Mostra os primeiros 300 caracteres
      // *************************************
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgData)
        this.mapAnimationClass = 'animate-fade-in'

        const observer = new MutationObserver(() => {
          const svgElement = document.getElementById('svg-map') as unknown as SVGSVGElement
          if(svgElement){
            observer.disconnect()
            this.attachSVGEvents(svgElement)
          }
        })

        observer.observe(document.body, { childList: true, subtree: true})
      })
    }, 500)
    this.exportMapCode.emit(mapCode)
  }

  private attachSVGEvents(svgElement: SVGSVGElement): void {
    const paths = svgElement.querySelectorAll('path.maps')
    paths.forEach((path) => {
      path.addEventListener('mouseover', (event) => {
        const district = (event?.target as SVGPathElement).getAttribute('id')
        this.showTooltip(event as MouseEvent, event.target as SVGSVGElement, district || '')
      })
      path.addEventListener('mouseout', (event) => this.hideTooltip())
      path.addEventListener('click', (event) => {
        const district = (event?.target as SVGPathElement).getAttribute('id')
        this.emitirMunicipioEscolhida(district || '')
      })
    })

    const links = svgElement.querySelectorAll('a')
    links.forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault()
        const district = (event.target as SVGElement).getAttribute('data-district')
        if(district){
          this.selectedDistrict = district
          this.mapCode = district.toLowerCase()
          this.loadSVG(this.mapCode)
          this.loadData(this.mapCode)
        }
      })
    })
  }

  loadData(mapCode: string): void {
    this.http.get<IDadosJSON[]>(`/wp-content/uploads/2026/03/${mapCode}.json`).subscribe((data) => {
      this.dataContent = data
    })
  }

  emitirMunicipioEscolhida(district: string) {
    this.municipioEscolhido.emit(this.dataContent.find(d => d.district === district)?.details)
  }

  showTooltip(event: MouseEvent, element: SVGSVGElement, district: string): void {
    const bbox = element.getBoundingClientRect();
    this.tooltipPosition = {
      x: bbox.x + bbox.width/ 2 + window.scrollX,
      y: bbox.y + window.scrollY
    }
    const dis = this.dataContent.find(d => d.district === district)?.details
    if(dis){
      this.tooltipTitle = dis.nome
      this.tooltipDescription = dis.populacaoTotal.toString()
      this.tootltipData = dis
    }
    this.tooltipVisible = true
  }

  hideTooltip(): void {
    this.tooltipVisible = false
  }
}
