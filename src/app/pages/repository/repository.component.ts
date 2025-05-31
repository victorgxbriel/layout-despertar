import { Component } from '@angular/core';
import { ArchiveComponent } from "../../components/archive/archive.component";
import { SaudeMaternaComponent } from "../../components/saude-materna/saude-materna.component";

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [ArchiveComponent, SaudeMaternaComponent],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {

}
