'use strict'

const view = () => {
    return {
        form: null,
        toDoContainer: null,

        createToDoItem(data) {
            const div = document.createElement('div');
            div.classList.add('col-4');
            div.setAttribute( `data-todo-id`, `${data.id}`)

            div.innerHTML = `<div class="taskWrapper">
                <button type="button" class="btn-close mb-2" aria-label="Close"></button>
                <select class="form-select mb-2" data-select-id=${data.id}>
                    <option value="no-status" ${data?.select === "no-status" ? "selected='true'" : ""}>Без статуса</option>
                    <option value="pending" ${data?.select === "pending" ? "selected='true'" : ""}>В работе</option>
                    <option value="сompleted" ${data?.select === "сompleted" ? "selected='true'" : ""}>Завершен</option>
                </select>
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
            </div>`;

            return div;
        },

        removeToDoItem(item) {
            item.remove();
        },

        resetForm(formElement) {
            formElement.reset();
        },

        addToDoItem(dataInput) {
            this.toDoContainer.append(this.createToDoItem(dataInput));
        },

        init(formElement, containerElement) {
            this.form = formElement;
            this.toDoContainer = containerElement;
        },
    }
}