import React, { useRef, useState } from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
	Elements,
	CardElement,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import emailjs from "emailjs-com";
import apiKey from "emailjs";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
	checkoutToken,
	shippingData,
	backStep,
	onCaptureCheckout,
	nextStep,
	timeout,
}) => {
	console.log(apiKey, "apiKey");
	const [NewEmail] = useState(shippingData?.NewEmail);
	console.log(NewEmail);
	// console.log(`in the payment screen`, shippingData?.NewEmail);

	const handleSubmit = async (event, elements, stripe) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod(
			{ type: "card", card: cardElement }
		);
		if (error) {
			console.log("[error]", error);
		} else {
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email,
				},
				shipping: {
					name: "Primary",
					street: shippingData.address1,
					town_city: shippingData.city,
					county_state:
						shippingData.shippingSubdivision,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry,
				},
				fulfillment: {
					shipping_method: shippingData.shippingOption,
				},
				payment: {
					gateway: "stripe",
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			};

			onCaptureCheckout(checkoutToken.id, orderData);
			timeout();
			nextStep();
		}
	};
	// console.log(NewEmail);
	const form = useRef();
	const handle = (e) => {
		e.preventDefault();
		emailjs.sendForm(
			`service_w5worwm`,
			"template_4tkwmgq",
			form.current,
			"user_y1lJAxyMhrkxz9FrAQbCu"
		).then(
			(result) => {
				alert(
					"Message Sent, We will get back to you shortly",
					result.text
				);
			},
			(error) => {
				alert(
					"An error occurred, Please try again",
					error.text
				);
			}
		);
	};

	return (
		<>
			<Review checkoutToken={checkoutToken} />

			<Divider />
			<Typography
				variant="h6"
				gutterBottom
				style={{ margin: "20px 0" }}>
				Payment method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form
							ref={form}
							onSubmit={(e) => {
								handleSubmit(
									e,
									elements,
									stripe
								);
								handle(e);
							}}>
							<CardElement />
							<br /> <br />
							<div
								style={{
									display: "flex",
									justifyContent:
										"space-between",
								}}>
								<Button
									variant="outlined"
									onClick={
										backStep
									}>
									Back
								</Button>
								<Button
									type="submit"
									variant="contained"
									disabled={
										!stripe
									}
									color="primary">
									Pay:{" "}
									{
										checkoutToken
											.live
											.subtotal
											.formatted_with_symbol
									}
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default PaymentForm;
