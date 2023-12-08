import './index.css'
import ContactForm from './models/ContactForm'

const openContactButton = document.getElementById('openContactButton') as HTMLButtonElement
const contactDialog = document.getElementById('contactDialog') as HTMLDialogElement
const contactForm = document.getElementById('contactForm') as HTMLFormElement
const closeContactButton = document.getElementById('closeContactButton') as HTMLButtonElement

const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement
const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement
const emailInput = document.getElementById('emailInput') as HTMLInputElement
const phoneInput = document.getElementById('phoneInput') as HTMLInputElement
const messageTextarea = document.getElementById('messageTextarea') as HTMLTextAreaElement

openContactButton.addEventListener('click', () => {
  contactDialog.showModal()
})

closeContactButton.addEventListener("click", () => {
  contactDialog.close()
})

const contact = new ContactForm()
// Предзаполняем форму ранее введенными данными.
{
  const savedFirstName = localStorage.getItem(firstNameInput.id)
  if (savedFirstName !== null) {
    contact.firstName = savedFirstName
    firstNameInput.value = contact.firstName
  }
}
{
  const savedLastName = localStorage.getItem(lastNameInput.id)
  if (savedLastName !== null) {
    contact.lastName = savedLastName
    lastNameInput.value = contact.lastName
  }
}
{
  const savedEmailName = localStorage.getItem(emailInput.id)
  if (savedEmailName !== null) {
    contact.email = savedEmailName
    emailInput.value = contact.email
  }
}
{
  const savedPhone = localStorage.getItem(phoneInput.id)
  if (savedPhone !== null) {
    contact.phone = savedPhone
    phoneInput.value = contact.phone
  }
}
{
  const savedMessage = localStorage.getItem(messageTextarea.id)
  if (savedMessage !== null) {
    contact.message = savedMessage
    messageTextarea.value = contact.message
  }
}

firstNameInput.addEventListener('input', () => {
  contact.firstName = firstNameInput.value
  localStorage.setItem(firstNameInput.id, contact.firstName)
})
lastNameInput.addEventListener('input', () => {
  contact.lastName = lastNameInput.value
  localStorage.setItem(lastNameInput.id, contact.lastName)
})
emailInput.addEventListener('input', () => {
  contact.email = emailInput.value
  localStorage.setItem(emailInput.id, contact.email)
})
phoneInput.addEventListener('input', () => {
  contact.phone = phoneInput.value
  localStorage.setItem(phoneInput.id, contact.phone)
})
messageTextarea.addEventListener('input', () => {
  contact.message = messageTextarea.value
  localStorage.setItem(messageTextarea.id, contact.message)
})

contactForm.addEventListener('submit', e => {
  e.preventDefault()

  let invalidFields = ''

  if (contact.firstName === '') {
    invalidFields += 'Имя, '
  }
  if (contact.lastName === '') {
    invalidFields += 'Фамилия, '
  }
  if (!/^\S{1,64}@\S+?$/.test(contact.email)) {
    invalidFields += 'Email, '
  }
  if (contact.phone !== ''
    && !/^\+\d\(\d{3}\)\d{2}\-\d{2}\-\d{3}$/.test(contact.phone)) {
    invalidFields += 'Номер телефона, '
  }
  if (contact.message === '') {
    invalidFields += 'Сообщение, '
  }

  if (invalidFields !== '') {
    invalidFields = invalidFields.substring(0, invalidFields.length - 2)
    alert(`Поля ${invalidFields} заполнены не верно, пожалуйста исправьте`)
    return
  }

  localStorage.removeItem(firstNameInput.id)
  localStorage.removeItem(lastNameInput.id)
  localStorage.removeItem(emailInput.id)
  localStorage.removeItem(phoneInput.id)
  localStorage.removeItem(messageTextarea.id)

  const cookies = document.cookie.split('; ')
  if (cookies.find(c => c.startsWith('contactFormSubmitted'))?.split('=')[1] === 'true') {
    const firstName = cookies.find(c => c.startsWith('firstName'))?.split('=')[1]
    const lastName = cookies.find(c => c.startsWith('lastName'))?.split('=')[1]

    alert(`${firstName} ${lastName}, ваше обращение обрабатывается!`)
    contactDialog.close()
    return
  }

  document.cookie = 'contactFormSubmitted=true'
  document.cookie = `firstName=${contact.firstName}`
  document.cookie = `lastName=${contact.lastName}`

  alert(`${contact.firstName} ${contact.lastName}, спасибо за обращение!`)
  contactDialog.close()
})
