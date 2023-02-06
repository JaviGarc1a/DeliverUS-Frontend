import { get } from './helpers/ApiRequestsHelper'

function getProductCategories () {
  return get('productCategories')
}

function getTopProduct () {
  return get('products/popular')
}

export { getProductCategories, getTopProduct }
