export { View }

    class View {
        constructor(container) {
            this.container = container;
            this.divRow = document.createElement('div');
        }
        mostrarItems(Items){
           
            this.divRow.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
            this.container.append(this.divRow);
            for( let key in Items){
                this.render(Items[key]);
            }
        }
        render(Item){  // Esta funció serà sobreescrita per cada vista

        }
    }
