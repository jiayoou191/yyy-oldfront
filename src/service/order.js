import { _request } from './_base.js'

export const checkAddress = async ({title, address, province, city, lng, lat}) => {
  try {
    const res = await _request({
      url: '/api/address/check',
      data: { title, address, province, city, lng, lat }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const queryRouter = async ({ itemTypeId, startAddressId, endAddressId, items}) => {
  try {
    const res = await _request({
      url: '/api/query/post_query',
      data: { 
        itemTypeId, 
        startAddressId, 
        endAddressId, 
        items 
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const queryRouterDetail = async ({ id }) => {
  try {
    const res = await _request({
      url: '/api/plan/get_by_query',
      data: {
        queryId: id
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const queryExchangeRate = async () => {
  try {
    const res = await _request({
      url: '/api/exchange/rate',
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const postOrder = async (id) => {
  try {
    const res = await _request({
      url: '/api/order/post_order',
      data: {
        planId: id
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const cancelOrder = async (id) => {
  try {
    const res = await _request({
      url: '/api/order/cancel',
      data: {
        orderId: id
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const postShippingBook = async (data) => {
  try {
    const res = await _request({
      url: '/api/order/postshippingbook',
      data: data
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getOrderList = async () => {
  try {
    const res = await _request({
      url: '/api/order/querybyuser',
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getOrderDetail = async (id) => {
  try {
    const res = await _request({
      url: '/api/order/querybyid',
      data: {
        orderId: id
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getPlanDetail = async (id) => {
  try {
    const res = await _request({
      url: '/api/plan/querybyid',
      data: {
        planId: id
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

