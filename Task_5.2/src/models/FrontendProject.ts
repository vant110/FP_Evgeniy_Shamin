import Img from './Img'
import Project from './Project'

class FrontendProject extends Project {
  #imgs: Img[] = []

  get imgs() {
    return this.#imgs
  }

  toString() {
    let s = `${super.toString()}\n(${this.#imgs.length}) Изображения:`

    for (let i = 0; i < this.#imgs.length; i++) {
      s += `\n${i}: ${this.#imgs[i]}`
    }

    return s
  }
}

export default FrontendProject
