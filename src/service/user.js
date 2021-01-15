import { _request } from './_base.js'

export const sendSms = async (phone) => {
  try {
    const res = await _request({
      url: '/api/user/sendsms',
      data: {
        phone
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const login = async ({ phone, code, password }) => {
  try {
    const res = await _request({
      url: '/api/user/login',
      data: {
        phone,
        code,
        password
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getUserInfo = async () => {
  try {
    const res = await _request({
      url: '/api/user/info',
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const registerFirst = async ({ phone, code }) => {
  try {
    const res = await _request({
      url: '/api/user/register',
      data: {
        phone,
        code,
        step: 1,
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const registerSecond = async ({ phone, name, company, email, password}) => {
  try {
    const res = await _request({
      url: '/api/user/register',
      data: {
        name,
        email,
        phone,
        company,
        password,
        step: 2,
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}