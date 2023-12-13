import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'

import AnimalService from './AnimalService'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  animals = this.animalService.getAnimals()
  catsHidden = false
  detailedAnimalId?: number

  constructor(private animalService: AnimalService) {
  }

  toggleDetailedAnimal(animalId: number) {
    this.detailedAnimalId = this.detailedAnimalId === animalId ? undefined : animalId
  }

  toggleCatsHidden() {
    this.catsHidden = !this.catsHidden

    this.animals = this.animalService.getAnimals(this.catsHidden)
  }
}
