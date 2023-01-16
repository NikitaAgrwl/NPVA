import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';
import '../css/payment.css';
import { emptyBasket } from '../redux/action';
import { db } from '../firebase';

function Payment({ basketData, userData, clearBasket }) {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    const [total, setTotal] = useState('')

    async function handleSubmit(event) {
        //stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db.collection('users').doc(userData?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basketData,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            clearBasket();
            navigate('/orders', { replace: true })
        })
    }

    function handleChange(event) {
        //listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    function getBasketTotal() {
        const total = basketData?.reduce((amount, payload) => payload.data.price + amount, 0);
        setTotal(total);
    }

    useEffect(() => {
        getBasketTotal();
    }, [basketData])

    useEffect(() => {
        //generate the stripe secret which allows us to charge the customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the toal to be in currencies subunits
                url: `/payments/create?total=${total * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basketData])

    console.log("the secret key is >>>>>>>>>>>>>>>>>>", clientSecret);


    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout ({<Link to="/checkout">{basketData?.length} items</Link>})
                </h1>
                {/* delivery address */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{userData}</p>
                        <p>ABC road</p>
                        <p> Guwahati-01</p>
                    </div>
                </div>
                {/* item review */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basketData.map(item => (
                            <CheckoutProduct
                                compId={item.id}
                                id={item.data.id}
                                title={item.data.title}
                                image={item.data.image}
                                price={item.data.price}
                                rating={item.data.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* payment method */}
                <div className='payment_section'>
                    <h3>Payment Method</h3>
                    <div className='payment_details'>
                        {/* stripe */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total:{value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={total}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'₹'}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketData: state.basketReducer.basket,
        userData: state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearBasket: (data) => { dispatch(emptyBasket(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);