import CartActionTypes from './cart.types'

const INITIAL_STATE =  {
    hidden: true
};

//we do need paylod for this actions/reducer
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }

}

export default cartReducer;