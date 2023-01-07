import React from 'react';
import { connect } from 'react-redux';
import "../css/checkout.css";
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout({ basketData, userData }) {

    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img
                    className='checkout_ad'
                    src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                    alt=''
                />

                <div>
                    <h3>Hey, {userData}</h3>
                    <h2 className='checkout_title'>Your Shopping Basket</h2>
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
            <div className='checkout_right'>
                <Subtotal />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketData: state.basketReducer.basket,
        userData: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addNote: (data) => { dispatch(addNote(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);