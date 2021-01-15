import { _request } from './_base.js'

export const getGoods = async () => {
  try {
    const res = await _request({
      url: '/api/item/get_item_types',
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}