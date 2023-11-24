import Decimal from 'decimal.js'

import { Operation, getSymbol } from './models/Operation'
import { Calculation } from './models/Calculation'
import { Calculator } from './models/Calculator'

const openHistoryButton = document.getElementById('openHistoryButton')!
const historyDialog = document.getElementById('historyDialog') as HTMLDialogElement
const historyContainer = document.getElementById('historyContainer')!
const closeHistoryButton = document.getElementById('closeHistoryButton')!

const prevOutput = document.getElementById('prevOutput')!
const currOutput = document.getElementById('currOutput')!

const clearButton = document.getElementById('clearButton')!

const degreeButton = document.getElementById('degreeButton')!
const rootButton = document.getElementById('rootButton')!
const divideButton = document.getElementById('divideButton')!
const multiplyButton = document.getElementById('multiplyButton')!
const subtractButton = document.getElementById('subtractButton')!
const addButton = document.getElementById('addButton')!

const toggleSignButton = document.getElementById('toggleSignButton')!
const _0Button = document.getElementById('0Button')!
const delimiterButton = document.getElementById('delimiterButton')!

const calculateButton = document.getElementById('calculateButton')!

const delimiter = (.1).toLocaleString().charAt(1)

delimiterButton.innerText = delimiter

function parseNumber(s: string) {
  return new Decimal(s.replace(delimiter, '.'))
}

function parseString(n: Decimal) {
  return n.toString().replace('.', delimiter)
}

class MyCalculator extends Calculator {
  #prev!: string
  #curr!: string
  #isFlushed = false

  constructor() {
    super()

    this.clear()
  }

  get prev() {
    return this.#prev
  }
  set prev(s: string) {
    this.#prev = s
    prevOutput.innerText = this.#prev

    this.#isFlushed = false
  }

  get curr() {
    return this.#curr
  }
  set curr(s: string) {
    this.#curr = s
    currOutput.innerText = this.#curr

    this.#isFlushed = false
  }

  get isFlushed() {
    return this.#isFlushed
  }

  clear(curr = '') {
    this.calculation.n1 = undefined
    this.calculation.n2 = undefined
    this.calculation.operation = undefined

    this.prev = ''
    this.curr = curr
  }

  saveAndFlush() {
    super.saveAndFlush()

    this.#isFlushed = true
  }

  restore(historyIndex: number) {
    const calculation = this.history[historyIndex]

    this.prev = `${parseString(calculation.n1!)} ${getSymbol(calculation.operation!)} ${parseString(calculation.n2!)} =`
    this.curr = parseString(calculation.calculate()!)

    this.calculation = new Calculation()
    this.#isFlushed = true
  }
}

const myCalculator = new MyCalculator()

// История

openHistoryButton.addEventListener('click', () => {
  if (myCalculator.history.length === 0) {
    historyContainer.innerText = 'Ничего не найдено'
  }
  else {
    let historyHTML = ''

    for (let i = myCalculator.history.length - 1; i >= 0; i--) {
      historyHTML += `
        <button data-history-index='${i}' class='btn btn-ghost h-min px-1.5 justify-between font-normal normal-case'>
          <time datetime='${myCalculator.history[i].timestamp!.toISOString()}' class='text-xs'>
            ${myCalculator.history[i].timestamp!.toLocaleTimeString(undefined, { timeStyle: 'short' })}
          </time>
          <div class='ml-2 flex flex-col items-end'>
            <span class='text-sm whitespace-nowrap'>
              ${parseString(myCalculator.history[i].n1!)}
              ${getSymbol(myCalculator.history[i].operation!)}
              ${parseString(myCalculator.history[i].n2!)}
              =
            </span>
            <span class='text-base font-semibold'>
              ${parseString(myCalculator.history[i].calculate()!)}
            </span>
          </div>
        </button>
      `
    }

    historyContainer.innerHTML = historyHTML

    historyContainer.childNodes.forEach(element => {
      element.addEventListener('click', e => {
        const historyIndex = Number((e.currentTarget as HTMLElement).getAttribute('data-history-index'))

        myCalculator.restore(historyIndex)

        historyDialog.close()
      })
    })
  }

  historyDialog.showModal()
})

closeHistoryButton.addEventListener("click", () => {
  historyDialog.close()
})

// Очистка

clearButton.addEventListener('click', () => {
  myCalculator.clear()
})

// Ввод

_0Button.addEventListener('click', () => {
  if (myCalculator.isFlushed) {
    myCalculator.clear('0')
    return
  }

  if (myCalculator.curr === '0'
    || myCalculator.curr === '-0') {
    return
  }

  myCalculator.curr += '0'
})

for (let i = 1; i < 10; i++) {
  document.getElementById(`${i}Button`)!.addEventListener('click', () => {
    if (myCalculator.isFlushed) {
      myCalculator.clear(i.toString())
      return
    }

    myCalculator.curr = myCalculator.curr === '0'
      ? i.toString()
      : myCalculator.curr === '-0'
        ? `-${i}`
        : `${myCalculator.curr}${i}`
  })
}

toggleSignButton.addEventListener('click', () => {
  const curr = myCalculator.curr.startsWith('-')
    ? myCalculator.curr.substring(1)
    : `-${myCalculator.curr === '' ? 0 : myCalculator.curr}`

  if (myCalculator.isFlushed) {
    myCalculator.clear(curr)
    return
  }

  myCalculator.curr = curr
})

delimiterButton.addEventListener('click', () => {
  if (myCalculator.isFlushed) {
    myCalculator.clear(`0${delimiter}`)
    return
  }

  if (myCalculator.curr.includes(delimiter)) {
    return
  }

  myCalculator.curr = (myCalculator.curr === ''
    ? '0'
    : myCalculator.curr === '-'
      ? '-0'
      : myCalculator.curr) + delimiter
})

// Операции

function getHandler(operation: Operation) {
  return () => {
    if (myCalculator.curr !== '') {
      myCalculator.calculation.n1 = parseNumber(myCalculator.curr)
    }
    else if (myCalculator.calculation.n1 === undefined) {
      if (operation === Operation.Root) {
        myCalculator.calculation.n1 = new Decimal(2)
      }
      else {
        return
      }
    }

    myCalculator.calculation.operation = operation

    myCalculator.prev = `${parseString(myCalculator.calculation.n1)} ${getSymbol(operation)}`
    myCalculator.curr = ''
  }
}

degreeButton.addEventListener('click', getHandler(Operation.Degree))
rootButton.addEventListener('click', getHandler(Operation.Root))
divideButton.addEventListener('click', getHandler(Operation.Divide))
multiplyButton.addEventListener('click', getHandler(Operation.Multiply))
subtractButton.addEventListener('click', getHandler(Operation.Subtract))
addButton.addEventListener('click', getHandler(Operation.Add))

// Вычисление

calculateButton.addEventListener('click', () => {
  if (myCalculator.calculation.n1 === undefined
    || myCalculator.calculation.operation === undefined
    || myCalculator.curr === '') {
    return
  }

  myCalculator.calculation.n2 = parseNumber(myCalculator.curr)

  myCalculator.prev = `${myCalculator.prev} ${parseString(myCalculator.calculation.n2)} =`
  myCalculator.curr = parseString(myCalculator.calculation.calculate()!)

  myCalculator.saveAndFlush()
})
