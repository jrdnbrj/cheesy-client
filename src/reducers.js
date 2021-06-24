const _state = {
    products: [],
    cart: []
}

const reducers = (state = _state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        default: return { ...state }
    }
}

export default reducers