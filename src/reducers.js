const _state = {
    products: [],
    mozzarella: {},
    cheddar: {},
    pepperjack: {},
    mix: {},
    fruits: {}
}

const reducers = (state = _state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'GET_MOZZARELLA': 
            return { mozzarella: state.products }
        case 'GET_CHEDDAR': 
            return { cheddar: state.cheddar }
        case 'GET_PEPPER_JACK': 
            return { pepperjack: state.pepperjack }
        case 'GET_MIX': 
            return { mix: state.mix }
        case 'GET_FRUITS': 
            return { fruits: state.fruits }
        default: return { ...state }
    }
}

export default reducers