'use strict';
const imported = require("./inventory.js");
// console.log(imported.inventory['Sallad']);

// foundations, proteins, extras, and dressing

let foundations =  Object.keys(imported.inventory).filter(x => Object.keys(imported.inventory[x])[1] === 'foundation');
let proteins = Object.keys(imported.inventory).filter(x => Object.keys(imported.inventory[x])[1] === 'protein');
let extras = Object.keys(imported.inventory).filter(x => Object.keys(imported.inventory[x])[1] === 'extra');
let dressings = Object.keys(imported.inventory).filter(x => Object.keys(imported.inventory[x])[1] === 'dressing');

// console.log('Foundations: ' + foundations.reduce((x, xs) => x + ', ' + xs));
// console.log('Proteins: ' + proteins.reduce((x, xs) => x + ', ' + xs));
// console.log('Extras: ' + extras.reduce((x, xs) => x + ', ' + xs));
// console.log('Dressings: ' + dressings.reduce((x, xs) => x + ', ' + xs));

// console.log(foundations)

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
        let foundationPrice = (this.foundation.length !== 0) ? this.foundation.map((x => imported.inventory[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;
        let proteinPrice = (this.protein.length !== 0) ? this.protein.map((x => imported.inventory[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;
        let extrasPrice = (this.extra.length !== 0) ? this.extra.map((x => imported.inventory[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;
        let dressingPrice = (this.dressing.length !== 0) ? this.dressing.map((x => imported.inventory[x['ingredient']]['price'] * x['amount'])).reduce((x, xs) => x + xs) : 0;

        return foundationPrice + proteinPrice + extrasPrice + dressingPrice;
    }

    exists(property, selection){
        return property.filter(x => x['ingredient'] === selection).length !== 0;
    }
}

class ExtraGreenSalad extends Salad {
    constructor(){
        super();
    }

    addSelection(selection){
        if(imported.inventory[selection].foundation){
            super.addSelection(selection, 1.3);
        } else if(imported.inventory[selection].extra){ 
            super.addSelection(selection, 0.5);
        } else {
            super.addSelection(selection);
        }

    }

}

class GourmetSalad extends Salad {
    constructor(){
        super();
    }
}

// console.log(imported.inventory['Sallad']['foundation'])

let myCesarSalad = new Salad();
myCesarSalad.addSelection("Salad + Quinoa"); // 10
myCesarSalad.addSelection('Kycklingfilé'); // 10
myCesarSalad.addSelection('Tomat'); // 5
myCesarSalad.addSelection('Parmesan'); // 5
myCesarSalad.addSelection('Ceasardressing'); // 5
myCesarSalad.addSelection('Bacon');
console.log(myCesarSalad);
console.log(myCesarSalad.price());

console.log('---');

let mySalad = new ExtraGreenSalad();
mySalad.addSelection("Salad + Quinoa"); // 10
mySalad.addSelection('Kycklingfilé'); // 10
mySalad.addSelection('Tomat'); // 5
mySalad.addSelection('Parmesan'); // 5
mySalad.addSelection('Ceasardressing'); // 5
console.log(mySalad);
console.log(mySalad.price());