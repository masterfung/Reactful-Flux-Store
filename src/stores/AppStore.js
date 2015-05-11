/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = 'change';

let pages = {};
let _products = {},
    _cartVisible = false;
let loading = false;

if (__SERVER__) {
  pages['/'] = {title: 'Home Page'};
  pages['/privacy'] = {title: 'Privacy Policy'};
  pages['/about'] = {title: 'About'};
  pages['/shop'] = {title: 'Shop'};
}

let addItem = function addItem(sku, update) {
  update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
  _products[sku] = _.extend({}, _products[sku], update)
};

let setVisibilityOfCart = function setVisibilityOfCart(cartVisible) {
  _cartVisible = cartVisible;
};

let removeItemFromCart = function removeItemFromCart(sku) {
  delete _products[sku]
};

let AppStore = _.extend({}, EventEmitter.prototype, {

  isLoading() {
    return loading;
  },

  /**
   * Gets page data by the given URL path.
   *
   * @param {String} path URL path.
   * @returns {*} Page data.
   */
  getPage(path) {
    return path in pages ? pages[path] : {
      title: 'Page Not Found',
      type: 'notfound'
    };
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  off(callback) {
    this.off(CHANGE_EVENT, callback);
  },

  getCartItems() {
    return _products;
  },

  getCartCount() {
    return Object.keys(_products).length;
  },

  getCartTotal() {
    let total = 0;
    for (product in _products) {
      if (_products.hasOwnProperty(product)) {
        total += _products[product].price * _products[product].quantity;
      }
      return total.toFixed(2);
    }
  },

  getCartVisible() {
    return _cartVisible;
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppStore.dispatcherToken = Dispatcher.register((payload) => {
  let action = payload.action;
  let text;

  switch (action.actionType) {

    case ActionTypes.LOAD_PAGE:
      if (action.source === PayloadSources.VIEW_ACTION) {
        loading = true;
      } else {
        loading = false;
        if (!action.err) {
          pages[action.path] = action.page;
        }
      }
      AppStore.emitChange();
      break;

    case ActionTypes.CART_ADD:
      addItem(action.sku, action.update);
      break;

    case ActionTypes.CART_VISIBLE:
      setVisibilityOfCart(action.cartVisible);
      break;

    case ActionTypes.CART_REMOVE:
          removeItemFromCart(action.sku);
          break;

    default:
      return true;

  }

  //CartStore.emitChange();
  //
  //return true;

});

export default AppStore;
