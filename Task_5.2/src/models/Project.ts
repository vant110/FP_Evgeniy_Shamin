class Project {
  #name: string = ''

  get name() {
    return this.#name
  }

  set name(name: string) {
    if (name === '') {
      throw new Error("Название проекта не может быть пустой строкой.")
    }

    this.#name = name
  }

  constructor(name: string) {
    this.name = name
  }
}

export default Project
