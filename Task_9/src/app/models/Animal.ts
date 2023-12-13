import AnimalType from './AnimalType'
import Gender from './Gender'

class Animal {
  id: number
  type: AnimalType
  gender: Gender
  name: string
  birthYear: number
  vaccinated: boolean
  sterilized: boolean
  chipped: boolean

  constructor(
    id: number,
    type: AnimalType,
    gender: Gender,
    name: string,
    birthYear: number,
    vaccinated: boolean = false,
    sterilized: boolean = false,
    chipped: boolean = false) {
    this.id = id
    this.type = type
    this.gender = gender
    this.name = name
    this.birthYear = birthYear
    this.vaccinated = vaccinated
    this.sterilized = sterilized
    this.chipped = chipped
  }

  getType() {
    switch (this.type) {
      case AnimalType.Cat:
        switch (this.gender) {
          case Gender.Male: return 'Кот'
          case Gender.Female: return 'Кошка'
        }
      case AnimalType.Dog: return 'Собака'
    }
  }

  getGender() {
    switch (this.gender) {
      case Gender.Male: return 'Мужской'
      case Gender.Female: return 'Женский'
    }
  }
}

export default Animal
