import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, Slider } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [proLoading, setproLoading] = useState(false);
	const [cartLoading, setcartLoading] = useState(false);

	const fetchProducts = async () => {
		setproLoading(true);
		try {
			const { data } = await commerce.products.list();

			setProducts(data);
			setproLoading(false);
		} catch (error) {
			console.log(error);
			setproLoading(false);
		}
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		setcartLoading(true);
		try {
			const { cart } = await commerce.cart.add(productId, quantity);
			setCart(cart);
			setcartLoading(false);
			// console.log(`click`);
		} catch (error) {
			console.log(error);
			setcartLoading(false);
		}
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, {
			quantity,
		});
		setCart(cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		setIsLoading(true);
		try {
			const { cart } = await commerce.cart.empty();

			setCart(cart);

			setIsLoading(false);
		} catch (error) {
			console.log(`error`, error);
			setIsLoading(false);
		}
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);

			setOrder(incomingOrder);

			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/'>
						<Slider />
					</Route>
					<Route exact path='/Products'>
						<Navbar totalItems={cart.total_items} />
						<Products
							products={products}
							onAddToCart={handleAddToCart}
							proLoading={proLoading}
							cartLoading={cartLoading}
						/>
					</Route>

					<Route exact path='/Cart'>
						<Cart
							cart={cart}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
							isLoading={isLoading}
						/>
					</Route>

					<Route exact path='/Checkout'>
						<Checkout
							cart={cart}
							order={order}
							onCaptureCheckout={handleCaptureCheckout}
							error={errorMessage}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
