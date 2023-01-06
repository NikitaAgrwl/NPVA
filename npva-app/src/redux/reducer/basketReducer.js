const initialState = []

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return [...state, action.payload]

        case 'REMOVE_FROM_BASKET':
            const newState = state.filter(item => item.id != action.id)
            // console.log(newState, action.id.id, state[0].id);
            return [...newState]

        default:
            return state;
    }
}

export default basketReducer;