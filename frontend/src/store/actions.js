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
}