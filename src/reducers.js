const _state = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
}

const reducers = (state = _state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'APPEND_TO_CART':
            const cart = [...state.cart, action.payload]
            localStorage.setItem('cart', JSON.stringify(cart))
            return {
                ...state,
                cart
            }
        case 'SET_CART':
            localStorage.setItem('cart', JSON.stringify(action.payload))
            return {
                ...state,
                cart: action.payload
            }
        default: return { ...state }
    }
}

export default reducers