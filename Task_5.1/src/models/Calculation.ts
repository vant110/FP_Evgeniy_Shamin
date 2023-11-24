import Decimal from 'decimal.js'

import { Operation } from './Operation'

export class Calculation {
  #timestamp?: Date
  n1?: Decimal
  n2?: Decimal
  operation?: Operation

  get timestamp() {
    return this.#timestamp
  }

  calculate() {
    if (this.n1 === undefined
      || this.n2 === undefined
      || this.operation === undefined) {
      return
    }

    if (this.#timestamp === undefined) {
      this.#timestamp = new Date()
    }

    let result: Decimal

    switch (this.operation) {
      case Operation.Degree:
        result = this.n1.pow(this.n2)
        break
      case Operation.Root:
        result = this.n2.pow(new Decimal(1).div(this.n1))
        break
      case Operation.Divide:
        result = this.n1.div(this.n2)
        break
      case Operation.Multiply:
        result = this.n1.mul(this.n2)
        break
      case Operation.Subtract:
        result = this.n1.sub(this.n2)
        break
      case Operation.Add:
        result = this.n1.add(this.n2)
        break
    }

    return result
  }
}
