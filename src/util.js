import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile'

export const deepCopySimpleObject = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isValidNumber = (phone) => {
  const result = parsePhoneNumberFromString(phone)
  return result && result.isValid()
}

export const isValidEmail = (email) => {
  const reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return reg.test(email)
}