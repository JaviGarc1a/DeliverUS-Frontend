import { get, post } from './helpers/ApiRequestsHelper'

function getOrder () {
  return get('orders')
}

function getOrderDetail (id) {
  return get(`orders/${id}`)
}

function create () {
  return post('orders')
}

export { getOrder, getOrderDetail, create }
