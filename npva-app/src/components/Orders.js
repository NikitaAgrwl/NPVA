import React, { useEffect, useState }   from 'react';
import Order                            from './Order';
import { db }                           from '../firebase';
import { connect }                      from 'react-redux';
import '../css/orders.css';

function Orders({ userData }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (userData) {
            db
                .collection('users')
                .doc(userData?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(doc => ({
                        id      : doc.id,
                        data    : doc.data()
                    })))
                })
        } else {
            setOrders([]);
        }

    }, [userData])

    return (
        <div className = 'orders'>
            <div className = 'orders_order'>
                {orders?.map(order => {
                    <Order order={order} />
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketData  : state.basketReducer.basket,
        userData    : state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // clearBasket: (data) => { dispatch(emptyBasket(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);