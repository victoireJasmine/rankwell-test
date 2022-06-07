export default {
    addProduct: (context, product) => {
        if (window.localStorage) {
            var listProduct = JSON.parse(window.localStorage.getItem('cartProducts')) || [];
            listProduct.push(product);
            window.localStorage.setItem('cartProducts', JSON.stringify(listProduct));
        }
        context.commit('ADD_PRODUCT', product);
    },
    removeProduct: (context, index) => {
        if (window.localStorage) {
            var listProduct = JSON.parse(window.localStorage.getItem('cartProducts')) || [];
            listProduct.splice(index, 1);
            window.localStorage.setItem('cartProducts', JSON.stringify(listProduct));
        }
        context.commit('REMOVE_PRODUCT', index);
    },
    setUser: (context, object) => {
        if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(object));
        }
        context.commit('SET_USER', object);
    },
    setToken: (context, value) => {
        if (window.localStorage) {
            window.localStorage.setItem('token', value);
        }
        context.commit('SET_TOKEN', value);
    },
    setAuth: (context, value) => {
        if (window.localStorage) {
            window.localStorage.setItem('isAuthenticated', JSON.stringify(value));
        }
        context.commit('SET_AUTH', value);
    },
}