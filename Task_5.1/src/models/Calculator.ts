import { Calculation } from './Calculation'

export class Calculator {
  #history: Calculation[] = []
  calculation = new Calculation()

  get history() {
    return this.#history
  }

  saveAndFlush() {
    this.#history.push(this.calculation)
    this.calculation = new Calculation()
  }
}
