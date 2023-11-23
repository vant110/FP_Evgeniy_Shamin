import BackendProject from './models/BackendProject'
import FrontendProject from './models/FrontendProject'
import Img from './models/Img'
import Project from './models/Project'

function log(projects: Project[]) {
  projects.forEach(project => {
    console.log(`- ${project.name}`)

    if (project instanceof FrontendProject) {
      console.log(project.imgs)
    }
    else if (project instanceof BackendProject) {
      console.log(project.description)
    }
  })
}

console.log('Создание:')

const frontendProject1 = new FrontendProject('FE проект 1')
frontendProject1.imgs.push(new Img('src1', 'Изображение 1'))
frontendProject1.imgs.push(new Img('src2', 'Изображение 2'))
frontendProject1.imgs.push(new Img('src3', 'Изображение 3'))

const backendProject1 = new BackendProject('BE проект 1', 'Описание BE проекта 1')

const projects: Project[] = [
  frontendProject1,
  backendProject1
]

log(projects)

console.log('\nИзменение:')

frontendProject1.name += ' (changed)'
frontendProject1.imgs.forEach(img => {
  img.alt += ' (changed)'
})

backendProject1.name += ' (changed)'
backendProject1.description += ' (changed)'

log(projects)

console.log('\nУдаление:')

projects.pop()

log(projects)
