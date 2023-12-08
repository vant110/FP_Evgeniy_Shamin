const APP_ID = '577b3bd2eec54e5a84a1ae825e746783'

const cityInput = document.getElementById('cityInput') as HTMLInputElement
const showButton = document.getElementById('showButton') as HTMLButtonElement
const forecast = document.getElementById('forecast') as HTMLDivElement

async function getForecast(lat: number, lon: number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}&cnt=8&units=metric&lang=ru`)

  if (!response.ok) {
    alert(response.status)
    return
  }

  const result = await response.json()

  let forecastHTML = ''
  result.list.forEach((r: any) => {
    const date = new Date(r.dt_txt + 'Z')

    forecastHTML += `
      <div>
        <div>
          Время:
          <time datetime='${date.toISOString()}'>${date.toLocaleTimeString(undefined, { timeStyle: 'short' })}</time>
        </div>
        <div>
          Температура:
          <output>${Math.round(r.main.temp)}</output>
          &deg;C
        </div>
        <div class='flex items-center space-x-2'>
          <img src='http://openweathermap.org/img/w/${r.weather[0].icon}.png' alt='${r.weather[0].description}' />
          <span class='first-letter:capitalize'>${r.weather[0].description}</span>
        </div>
      </div>
    `
  })
  forecast.innerHTML = forecastHTML
}

showButton.addEventListener('click', () => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${APP_ID}`)
  xhr.send()

  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert(xhr.status)
      return
    }

    const response = JSON.parse(xhr.response)

    if (response.length === 0) {
      alert('Город не найден.')
      return
    }

    getForecast(response[0].lat, response[0].lon)
  }
})
