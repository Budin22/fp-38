'use strict'
void function () {
    const outPut = () => {
        return {
            formSelector: 'todoForm',
            containerSelector: 'todoItems',
        }
    }
    const app = controller(
        view(),
        model(),
        outPut(),
    );
}();
