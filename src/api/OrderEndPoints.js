import { get } from './helpers/ApiRequestsHelper'

function getOrder () {
  return get('orders')
}

function getOrderDetail (id) {
  return get(`orders/${id}`)
}

export { getOrder, getOrderDetail }
