/**
 * Created by htm on 5/9/15.
 */

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = 'change';

let _product = {},
	_selected = null;

let loadProductData = function loadProductData(data) {
	_product = data[0];
	_selected = data[0].variants[0];
};

let setSelected = function setSelected(index) {
	_selected = _product.variants[index];
};

let ProductStore = _.extend({}, EventEmitter.prototype, {
	getProduct() {
		return _product;
	},

	getSelected() {
		return _selected;
	},

	emitChange() {
		return this.emit(CHANGE_EVENT);
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
		case ActionTypes.RECEIVE_DATA:
			loadProductData(action.data);
			break;

		case ActionTypes.SELECT_PRODUCT:
			setSelected(action.data);
			break;

		default:
			return true;
	}

	//ProductStore.emitChange();
	//
	//return true;

});