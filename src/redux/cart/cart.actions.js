import CartActionsTypes from './cart.types';

//payload is optional
export const toggleCartHidden = () => ({
    type: CartActionsTypes.TOGGLE_CART_HIDDEN
})