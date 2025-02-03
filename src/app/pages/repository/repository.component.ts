import { Component } from '@angular/core';
import { ArchiveComponent } from "../../components/archive/archive.component";

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [ArchiveComponent],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {

}
