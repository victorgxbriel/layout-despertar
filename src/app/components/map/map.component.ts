import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { CommonModule } from '@angular/common';

interface IDistrictData {
  district: string,
  details: {
    title: string,
    description: string
  }
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TooltipComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  @Input() mapCode!: string;
  @Output() exportMapCode = new EventEmitter<string>()
  svgContent!: SafeHtml
  selectedDistrict!: string | null
  dataContent!: IDistrictData[]
  tooltipPosition = { x: 0, y: 0}
  tooltipTitle!: string
  tooltipDescription!: string
  tooltipVisible = false
  mapAnimationClass = ''

  http = inject(HttpClient)
  sanitizer = inject(DomSanitizer)

  ngOnInit(): void {
    if(!this.mapCode)
      this.mapCode = 'brasil'
    this.loadSVG(this.mapCode)
    this.loadData(this.mapCode)
  }

  loadSVG(mapCode: string): void {
    this.mapAnimationClass = 'animate-fade-out'
    // o setTimeout foi para estabecer um tempo entre as animações
    setTimeout(() => {
      this.http.get(`../../../assets/maps/svg/${mapCode}.svg`, { responseType: 'text'}).subscribe((data) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(data)
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
    console.log(mapCode)
    this.exportMapCode.emit(mapCode)
    console.log("enviei")
  }

  private attachSVGEvents(svgElement: SVGSVGElement): void {
    const paths = svgElement.querySelectorAll('path.maps')
    paths.forEach((path) => {
      path.addEventListener('mouseover', (event) => {
        const district = (event?.target as SVGPathElement).getAttribute('data-district')
        this.showTooltip(event as MouseEvent, event.target as SVGSVGElement, district || '')
      })
      path.addEventListener('mouseout', (event) => this.hideTooltip())
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
    this.http.get<IDistrictData[]>(`assets/data/${mapCode}.json`).subscribe((data) => {
      this.dataContent = data
    })
  }

  showTooltip(event: MouseEvent, element: SVGSVGElement, district: string): void {
    const bbox = element.getBoundingClientRect();
    this.tooltipPosition = {
      x: bbox.x + bbox.width/ 2 + window.scrollX,
      y: bbox.y + window.scrollY
    }
    const dis = this.dataContent.find(d => d.district === district)?.details
    if(dis){
      this.tooltipTitle = dis.title
      this.tooltipDescription = dis.description
    }
    this.tooltipVisible = true
  }

  hideTooltip(): void {
    this.tooltipVisible = false
  }

  backBrasilMap(): void {
    this.mapCode = 'brasil'
    this.loadSVG(this.mapCode)
    this.loadData(this.mapCode)
  }

}
