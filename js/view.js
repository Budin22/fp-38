'use strict'

const view = () => {
    return {
        toDoContainer: null,

        set createToDoItem(data) {
            const div = document.createElement('div');
            div.classList.add('col-4');
            div.setAttribute( `data-todo-id`, `${data.id}`)

            div.innerHTML = `<div class="taskWrapper">
                <button type="button" class="btn-close mb-2" aria-label="Close"></button>
                <select class="form-select mb-2" data-select-id=${data.id}>
                    <option value="no-status" ${data?.select === "no-status" ? "selected" : ""}>Без статуса</option>
                    <option value="pending" ${data?.select === "pending" ? "selected" : ""}>В работе</option>
                    <option value="сompleted" ${data?.select === "сompleted" ? "selected" : ""}>Завершен</option>
                </select>
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
            </div>`;

            this.div = div;
        },

        set removeToDoItem(item) {
            item.remove();
        },

        set resetForm(formElement) {
            formElement.reset();
        },

        set addToDoItem(dataInput) {
            this.createToDoItem = dataInput;
            this.toDoContainer.append(this.div);
        },

        set initContainer(containerElement) {
            this.toDoContainer = containerElement;
        },
    }
}