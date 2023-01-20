const initialState = {
    basket: []
}

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket      : [...state.basket, action.payload]
            }

        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket      : state.basket.filter(item => item.id !== action.id)
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket      : []
            }

        default:
            return state;
    }
}

export default basketReducer;