import { _request } from './_base.js'

export const searchPlaces = async ({ input, language = 'zh'}) => {
  try {
    const res = await _request({
      url: 'http://47.89.12.2:8080/api/address/query',
      data: {
        input,
        language
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}