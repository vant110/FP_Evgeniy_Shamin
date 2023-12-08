import { Observable, filter, fromEvent, merge, range } from 'rxjs'

import './style.css'

// Простые числа от 1 до 100.

function isPrime(n: number) {
  if (n < 2) {
    return false
  }

  const limit = Math.sqrt(n)
  for (let i = 2; i <= limit; i++) {
    if (n % i === 0) {
      return false
    }
  }

  return true
}

const stream1 = range(1, 100)
  .pipe(filter(isPrime))

let primes = ''
stream1.subscribe(v => primes += `${v}, `)
primes = primes.substring(0, primes.length - 2)

document.querySelector<HTMLParagraphElement>('#primes')!.innerText = `Простые числа от 1 до 100: ${primes}.`

// Отсчет от 5 до 1

const stream2 = new Observable(o => {
  for (let i = 5; i >= 1; i--) {
    o.next(i)
  }

  o.error('Ошибка')
})

stream2.subscribe({
  next: v => alert(v),
  error: v => alert(v),
  complete: () => alert('complete')
})

// Три кнопки

const btn1 = document.getElementById('btn1') as HTMLButtonElement
const btn2 = document.getElementById('btn2') as HTMLButtonElement
const btn3 = document.getElementById('btn3') as HTMLButtonElement

const streamBtn1 = fromEvent(btn1, 'click')
const streamBtn2 = fromEvent(btn2, 'click')
const streamBtn3 = fromEvent(btn3, 'click')

const streamBtns = merge(streamBtn1, streamBtn2, streamBtn3)

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

streamBtns.subscribe(() => document.body.style.cssText = `background-color: rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)});`)
