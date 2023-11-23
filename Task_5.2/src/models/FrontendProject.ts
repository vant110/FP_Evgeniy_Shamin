import Img from './Img'
import Project from './Project'

class FrontendProject extends Project {
  #imgs: Img[] = []

  get imgs() {
    return this.#imgs
  }
}

export default FrontendProject
