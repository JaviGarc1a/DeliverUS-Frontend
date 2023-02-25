import { get, post } from './helpers/ApiRequestsHelper'

function getOrder () {
  return get('orders')
}

function getOrderDetail (id) {
  return get(`orders/${id}`)
}

function create (data) {
  return post('orders', data)
}

export { getOrder, getOrderDetail, create }
