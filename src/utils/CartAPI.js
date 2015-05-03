import AppActions from '../actions/AppActions';

export default {
	getProductData: () => {
		let data = JSON.parse(localStorage.getItem('product'));
		AppActions.receiveProduct(data);
	}
}