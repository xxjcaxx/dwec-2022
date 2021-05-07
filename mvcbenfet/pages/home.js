import { Page } from "./page.js"
export { PageHome };

class PageHome extends Page {

    constructor(name){
        super(name);
    }

    populate(container){
        
        container.innerHTML = `<h1>Home</h1>`
    }
}