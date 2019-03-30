/* global EcomCart */

;(function () {
  'use strict'

  /**
   * Add item to cart.
   * @param {object} newItem - New cart item object
   * @returns {boolean} True if item is valid and was added or updated on cart
   */

  EcomCart.add = function (newItem) {
    // check required fields
    if (typeof newItem.product_id === 'string' &&
      typeof newItem.quantity === 'number' && newItem.quantity >= 0 &&
      typeof newItem.price === 'number' && newItem.price >= 0) {
      // do the stuf
    } else {
      console.error(new Error('Trying to add invalid item object'))
      return false
    }

    for (var i = 0; i < EcomCart.items.length; i++) {
      var item = EcomCart.items[i]
      // check IDs
      if (item.product_id === newItem.product_id && item.variation_id === newItem.variation_id) {
        // same product and variation
        // update quantity and price
        item.quantity += newItem.quantity
        if (newItem.price) {
          item.price = newItem.price
        }
        if (newItem.final_price) {
          item.final_price = newItem.final_price
        }
        EcomCart.handleItem(item)
        return true
      }
    }

    // add item to cart
    EcomCart.items.push(newItem)
    EcomCart.handleItem(newItem)
    return true
  }
}())
