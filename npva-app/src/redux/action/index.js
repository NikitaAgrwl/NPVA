export const addToBasket = (data) => {
    return {
        type: 'ADD_TO_BASKET',
        payload: {
            id: Date.now(),
            data: data
        }
    }
}

export const removeFromBasket = (id) => {
    return {
        type: 'REMOVE_FROM_BASKET',
        id: id
    }
}
