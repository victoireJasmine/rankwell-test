export default {
    SET_USER(state,user){
        state.user = user
    },
    SET_TOKEN(state,token){
        state.token = token
    },
    SET_AUTH(state,isAuthenticated){
        state.isAuthenticated = isAuthenticated
    },
    SET_PRODUCT: (state, product) => {
        state.cartProducts = product;
    },
    ADD_PRODUCT: (state, product) => {
        state.cartProducts.push(product);
    },
    REMOVE_PRODUCT: (state, index) => {
        state.cartProducts.splice(index, 1);
    },
}