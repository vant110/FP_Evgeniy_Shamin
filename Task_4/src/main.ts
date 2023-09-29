import './style.css'

function getNumbers(count: number) {
  function getNumber(n: number) {
    let s = ''

    if (n % 3 == 0) {
      s += 'Fizz'
    }

    if (n % 5 == 0) {
      s += 'Buzz'
    }

    return s.length != 0 ? s : n.toString()
  }


  let s = ''

  for (let i = 1; i < count; i++) {
    s += `${getNumber(i)}, `
  }
  s += getNumber(count)

  return s
}

document.querySelector<HTMLDivElement>('#app')!.innerText = getNumbers(100)
