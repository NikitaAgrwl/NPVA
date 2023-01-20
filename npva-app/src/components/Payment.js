import React, { useEffect, useState }           from 'react';
import CheckoutProduct                          from './CheckoutProduct';
import CurrencyFormat                           from 'react-currency-format';
import axios                                    from '../axios';
import { CardElement, useElements, useStripe }  from '@stripe/react-stripe-js';
import { emptyBasket }                          from '../redux/action';
import { connect }                              from 'react-redux';
import { Link, useNavigate }                    from 'react-router-dom';
import { db }                                   from '../firebase';
import '../css/payment.css';

function Payment({ basketData, userData, clearBasket }) {

    const stripe                            = useStripe();
    const elements                          = useElements();
    const navigate                          = useNavigate();

    const [error, setError]                 = useState(null);
    const [disabled, setDisabled]           = useState(true);
    const [succeeded, setSucceeded]         = useState(false);
    const [processing, setProcessing]       = useState("");
    const [clientSecret, setClientSecret]   = useState(true);
    const [total, setTotal]                 = useState('')

    async function handleSubmit(event) {
        //stripe stuff
        event.preventDefault();
        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type    : 'card',
            card    : elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id }    = paymentMethod;
                const data      = {
                    id          : id,
                    payer       : paymentMethod.payerName,
                }

                const response = await axios.post(`/payments/create?total=${total * 100}`, data);

                setClientSecret(response.data.payload.client_secret);
                console.log(response.data);

                if (response.data.reply === 'success' && response.status == 201) {
                    const data = await db.collection('users').doc(userData?.uid).collection('orders').doc(response.data.id).set({
                        basket      : basketData,
                        amount      : response.data.payload.amount,
                        created     : response.data.payload.created
                    });

                    setSucceeded(true);
                    setError(null);
                    setProcessing(false);
                }

                clearBasket();
                navigate('/orders', { replace: true })
            } catch (e) {
                console.log('Error>>>>', e);
            }
        } else {
            console.log("error", error.message);
        }



    }


    function handleChange(event) {
        //listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    async function getBasketTotal() {
        const total = await basketData?.reduce((amount, payload) => payload.data.price + amount, 0);
        setTotal(total);
    }

    useEffect(() => {
        getBasketTotal();
    }, [basketData])

    //generate the stripe secret which allows us to charge the customer

    console.log("the secret key is >>>>>>>>>>>>>>>>>>", clientSecret);


    return (
        <div className = 'payment'>
            <div className = 'payment_container'>
                <h1>
                    Checkout ({<Link to="/checkout">{basketData?.length} items</Link>})
                </h1>
                {/* delivery address */}
                <div className = 'payment_section'>
                    <div className = 'payment_title'>
                        <h3>Payment Address</h3>
                    </div>
                    <div className = 'payment_address'>
                        <p>{userData}</p>
                        <p>ABC road</p>
                        <p> Guwahati-01</p>
                    </div>
                </div>
                {/* item review */}
                <div className = 'payment_section'>
                    <div className = 'payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className = 'payment_items'>
                        {basketData.map(item => (
                            <CheckoutProduct
                                compId      = {item.id}
                                id          = {item.data.id}
                                title       = {item.data.title}
                                image       = {item.data.image}
                                price       = {item.data.price}
                                rating      = {item.data.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* payment method */}
                <div className = 'payment_section'>
                    <h3>Payment Method</h3>
                    <div className = 'payment_details'>
                        {/* stripe */}
                        <form onSubmit = {handleSubmit}>
                            <CardElement onChange = {handleChange} />

                            <div className = 'payment_priceContainer'>
                                <CurrencyFormat
                                    renderText          =
                                    {(value) => (
                                        <>
                                            <h3>Order Total:{value}</h3>
                                        </>
                                    )}
                                    decimalScale        = {2}
                                    value               = {total}
                                    displayType         = {"text"}
                                    thousandSeparator   = {true}
                                    prefix              = {'₹'}
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
        basketData      : state.basketReducer.basket,
        userData        : state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearBasket: (data) => { dispatch(emptyBasket(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);