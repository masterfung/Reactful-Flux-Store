import './Fluxproduct.less';
import React from 'react/addons';
import CartStore from '../../stores/AppStore';
import FluxCart from '../FluxCart';
import ActionTypes from '../../actions/AppActions';

export default class FluxCart extends React.Component {
	constructor() {

	}

	closeCart() {
		ActionTypes.updateCartVisible(false);
	}

	openCart() {
		ActionTypes.updateCartVisible(true);
	}

	removeFromCart(sku) {
		ActionTypes.removeFromCart(sku);
		ActionTypes.updateCartVisible(false);
	}

	render() {
		return (
			<div className={"flux-cart " + (this.props.visible ? 'active' : '')}>
				<div className="mini-cart">
					<button type="button" className="close-cart" onClick={this.closeCart}>&times;</button>
					<ul>
						{Object.keys(products).map(function(product){
							return (
								<li key={product}>
									<h1 className="name">{products[product].name}</h1>
									<p className="type">{products[product].type} x {products[product].quantity}</p>
									<p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
									<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
								</li>
							)
						})}
					</ul>
					<span className="total">Total: ${this.props.total}</span>
				</div>
				<button type="button" className="view-cart" onClick={this.openCart} disabled={Object.keys(this.props.products).length > 0 ? "" : "disabled"}>View Cart ({this.props.count})</button>
			</div>
		)
	}
};
