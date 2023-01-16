import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/subtotal.css';

function Subtotal({ basketData }) {
    const navigate = useNavigate();
    const [total, setTotal] = useState('')

    function basketTotal() {
        const total = basketData?.reduce((amount, payload) => payload.data.price + amount, 0);
        setTotal(total);
    }

    useEffect(() => {
        basketTotal();
    }, [basketData])

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basketData?.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className='subtotal_gift'>
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={'₹'}
            />

            <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketData: state.basketReducer.basket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getTotal: (data) => { dispatch(getTotalBasketValue(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subtotal);