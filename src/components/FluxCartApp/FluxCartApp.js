import './FluxCartApp.less';
import React from 'react/addons';
import CartStore from '../../stores/AppStore';
import FluxCart from '../FluxCart';
import FluxProduct from '../FluxProduct';

function getCartState() {
	return {
		product: ProductStore.getProduct(),
		selectedProduct: ProductStore.getSelected(),
		cartItems: CartStore.getCartItems(),
		cartCount: CartStore.getCartCount(),
		cartTotal: CartStore.getCartTotal(),
		cartVisible: CartStore.getCartVisible()

	};
}

export default class FluxCartApp extends React.Component {
	getInitialState() {
		return getCartState();
	}

	componentDidMount() {

	}

};
