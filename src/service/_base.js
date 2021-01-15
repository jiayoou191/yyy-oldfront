import axios from 'axios'

export const _request = async ({ method = 'post', url, data = {}, params = {}, headers = {} }) => {
  try {
    const res = await axios({
      method: method.toLowerCase(),
      url,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    return res.data
  } catch (err) {
    return new Error(err)
  }
}