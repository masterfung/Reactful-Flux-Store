export default {
	// Load Mock Product Data Into localStorage
	init: function() {
		localStorage.clear();
		localStorage.setItem('product', JSON.stringify([
			{
				id: '777900',
				name: 'Signature Fleact Gem - Master Cut Series',
				image: 'fleact-gem.png',
				description: 'The finest gem speciment you will find in all of the Fleact Realm. Guaranteed to hold its value and luster. Master cut and perfect. Value quality rating of 9.9997!',
				variants: [
					{
						sku: '901',
						type: 'Sinki',
						price: 3,
						inventory: 1590

					},{
						sku: '909',
						type: 'Ankro',
						price: 12.1,
						inventory: 150

					},
					{
						sku: '912',
						type: 'Veltra',
						price: 120,
						inventory: 10
					},
					{
						sku: '975',
						type: 'Mezinato',
						price: 6555,
						inventory: 3
					},
					{
						sku: '999',
						type: 'Perfectina',
						price: 9999,
						inventory: 2
					}
				]
			}
		]));
	}

};