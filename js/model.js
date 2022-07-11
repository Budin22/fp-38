'use strict'

const model = () => {
    return {
        form: null,
        id: null,
        selectValue: "no-status",

        set initForm (formName) {
            this.form = formName;
            const savedData = this.getData;
            this.id = savedData ? savedData[savedData.length-1].id : 1;
        },

        get getData() {
            return JSON.parse(localStorage.getItem(this.form));
        },

        set setSelect({id, selectValue}) {
            const data = this.getData;
            data.forEach((item) => {
                if(item.id === id) {
                    item.select = selectValue;
                }
            });
            localStorage.setItem(this.form, JSON.stringify(data));
        },

        set setData(data) {
            const  toDoItemData = structuredClone(data);
            const savedData = this.getData;
            const localStorageDataContainer = savedData ? savedData : [];

            if(savedData) this.id += 1;

            toDoItemData.id = this.id;
            toDoItemData.select = this.selectValue;

            localStorageDataContainer.push(toDoItemData);
            localStorage.setItem(this.form, JSON.stringify(localStorageDataContainer));

            this.toDoItemData = toDoItemData;
        },

        set removeToDoItem(idRemoveItem) {
            const data = this.getData.filter((item) => item.id !== idRemoveItem);
            if(data.length !== 0) localStorage.setItem(this.form, JSON.stringify(data));
            else localStorage.clear();
        },
    }
}