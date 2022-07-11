'use strict'

function controller(view, model, outPut) {

    const formSelector = outPut.formSelector;
    const containerSelector = outPut.containerSelector;

    const form = document.getElementById(formSelector);
    const container = document.getElementById(containerSelector);

    model.initForm = formSelector;
    view.initContainer = container;

    const getDataForm = (inputsCollection) => {
        if(inputsCollection instanceof NodeList) inputsCollection = Array.from(inputsCollection);
        return inputsCollection.reduce((acc, item) => {
            try {
                if(item.value.trim() === "") return ;
                acc[item.name] = item.value
                return acc;
            } catch (error) {
                console.log(error);
            }
            },{}
        );
    }

    const submitHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const inputs = form.querySelectorAll('input, textarea');
        const data = getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");
        model.setData = data;

        view.addToDoItem = model.toDoItemData;
        view.resetForm = form;
    }

    const iteratorSetData = (iterator) => {
       for(let key of iterator) {
           view.addToDoItem = key;
       }
    }

    const contentLoadedHandler = () => {
        if(model.getData) iteratorSetData(model.getData[Symbol.iterator]());
    }

    const selectHandler = (event) => {
        event.stopPropagation();
        if(event.target instanceof HTMLSelectElement) {
            const selectValue = event.target.value;
            const id = +event.target.getAttribute('data-select-id');

            model.setSelect = {id, selectValue};
        }
    }

    const removeToDoItem = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(event.target instanceof HTMLButtonElement) {
            const toDoItem = event.target.parentElement.parentElement;

            model.removeToDoItem = +toDoItem.getAttribute('data-todo-id');
            view.removeToDoItem = toDoItem;
            if(localStorage.length < 1) view.resetForm = form;
        }
    }

    form.addEventListener('submit', submitHandler);
    window.addEventListener('DOMContentLoaded', contentLoadedHandler);
    container.addEventListener('click', removeToDoItem);
    container.addEventListener('change', selectHandler);

}