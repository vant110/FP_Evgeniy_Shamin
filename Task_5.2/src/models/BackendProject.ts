import Project from './Project'

class BackendProject extends Project {
  description: string

  constructor(name: string, description: string) {
    super(name)

    this.description = description
  }

  toString() {
    return `${super.toString()}\nОписание='${this.description}'`
  }
}

export default BackendProject
