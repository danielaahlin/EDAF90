const imported = require("./inventory.ES6");

let foundations =  Object.keys(imported.default).filter(x => Object.keys(imported.default[x])[1] === 'foundation');
let proteins = Object.keys(imported.default).filter(x => Object.keys(imported.default[x])[1] === 'protein');
let extras = Object.keys(imported.default).filter(x => Object.keys(imported.default[x])[1] === 'extra');
let dressings = Object.keys(imported.default).filter(x => Object.keys(imported.default[x])[1] === 'dressing');

class Salad {
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extra = [];
        this.dressing = [];
    }

    addSelection(selection, toAdd = 1){
        if(foundations.includes(selection)){
            if (this.exists(this.foundation, selection)){
                this.foundation.filter(x => x['ingredient'] === selection).map(x => x['amount'] += toAdd);
            } else {
                this.foundation.push({ingredient: selection, amount: toAdd});
            }
            return;
        } else if (proteins.includes(selection)) {
            if (this.exists(this.protein, selection)){
                this.protein.filter(x => x['ingredient'] === selection).map(x => x['amount'] += toAdd);
            } else {
                this.protein.push({ingredient: selection, amount: toAdd});
            }
            return;
        } else if (extras.includes(selection)) {
            if (this.exists(this.extra, selection)){
                this.extra.filter(x => x['ingredient'] === selection).map(x => x['amount'] += toAdd);
            } else {
                this.extra.push({ingredient: selection, amount: toAdd});
            }
            return;
        } else if (dressings.includes(selection)) {
            if (this.exists(this.dressing, selection)){
                this.dressing.filter(x => x['ingredient'] === selection).map(x => x['amount'] += toAdd);
            } else {
                this.dressing.push({ingredient: selection, amount: toAdd});
            }
            return;
        } else {
            console.log(selection + ' is not a viable option!'); //alert here instead?
        }
    }

    removeSelection(selection){
        if (this.foundation.filter(x => x['ingredient'] === selection).length !== 0){
            this.foundation.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1);
            this.foundation = this.foundation.filter(x => x['amount'] > 0);
        } else if (this.protein.filter(x => x['ingredient'] === selection).length !== 0){
            this.protein.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1);
            this.protein = this.protein.filter(x => x['amount'] > 0);
        } else if (this.extra.filter(x => x['ingredient'] === selection).length !== 0){
            this.extra.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1);
            this.extra = this.extra.filter(x => x['amount'] > 0);
        } else if (this.dressing.filter(x => x['ingredient'] === selection).length !== 0){
            this.dressing.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1);
            this.dressing = this.dressing.filter(x => x['amount'] > 0);
        } else {
            console.log(selection + ' is not in this salad and can not be removed.');
        }
    }

    price(){
        let foundationPrice = (this.foundation.length !== 0) ? this.foundation.map((x => imported.default[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;
        let proteinPrice = (this.protein.length !== 0) ? this.protein.map((x => imported.default[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;
        let extrasPrice = (this.extra.length !== 0) ? this.extra.map((x => imported.default[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;
        let dressingPrice = (this.dressing.length !== 0) ? this.dressing.map((x => imported.default[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;

        return foundationPrice + proteinPrice + extrasPrice + dressingPrice;
    }

    exists(property, selection){
        return property.filter(x => x['ingredient'] === selection).length !== 0;
    }
}

module.exports = Salad;