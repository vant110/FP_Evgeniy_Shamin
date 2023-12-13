import { Injectable } from '@angular/core'

import Animal from './models/Animal'
import AnimalType from './models/AnimalType'
import Gender from './models/Gender'

@Injectable({
  providedIn: 'root'
})
class AnimalService {
  private readonly animals = [
    new Animal(1, AnimalType.Cat, Gender.Male, 'Оливер', 2020, true, true, true),
    new Animal(2, AnimalType.Cat, Gender.Female, 'Луна', 2021, false, true, true),
    new Animal(3, AnimalType.Dog, Gender.Male, 'Купер', 2022, false, false, true),
    new Animal(4, AnimalType.Dog, Gender.Female, 'Белла', 2023, false, false, false),
  ]

  getAnimals(catsHidden = false) {
    return catsHidden
      ? this.animals.filter(a => a.type !== AnimalType.Cat)
      : this.animals
  }
}

export default AnimalService
