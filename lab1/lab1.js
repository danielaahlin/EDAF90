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

    addSelection(selection){
        if(foundations.includes(selection)){
            if (this.exists(this.foundation, selection)){
                this.foundation.filter(x => x['ingredient'] === selection).map(x => x['amount'] += 1)
            } else {
                this.foundation.push({ingredient: selection, amount: 1});
            }
            return;
        } else if (proteins.includes(selection)) {
            if (this.exists(this.protein, selection)){
                this.protein.filter(x => x['ingredient'] === selection).map(x => x['amount'] += 1)
            } else {
                this.protein.push({ingredient: selection, amount: 1});
            }
            return;
        } else if (extras.includes(selection)) {
            if (this.exists(this.extra, selection)){
                this.extra.filter(x => x['ingredient'] === selection).map(x => x['amount'] += 1)
            } else {
                this.extra.push({ingredient: selection, amount: 1});
            }
            return;
        } else if (dressings.includes(selection)) {
            if (this.exists(this.dressing, selection)){
                this.dressing.filter(x => x['ingredient'] === selection).map(x => x['amount'] += 1)
            } else {
                this.dressing.push({ingredient: selection, amount: 1});
            }
            return;
        } else {
            console.log(selection + ' is not a viable option!'); //alert here instead?
        }
    }

    removeSelection(selection){
        if (this.foundation.indexOf(selection) !== -1){
            if (this.foundation.filter(x => x['ingredient'] === selection).filter(x => x['amount'] === 1)){
                
            } else {
                this.foundation.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1)
            }
        } else if (this.protein.indexOf(selection) !== -1){
            this.protein.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1)
        } else if (this.extra.indexOf(selection) !== -1){
            this.extra.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1)
        } else if (this.dressing.indexOf(selection) !== -1){
            this.dressing.filter(x => x['ingredient'] === selection).map(x => x['amount'] -= 1)
        } else {
            console.log(selection + ' is not in this salad and can not be removed.')
        }
    }

    price(){
        let foundationPrice = this.foundation.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let proteinPrice = this.protein.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let extrasPrice = this.extra.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let dressingPrice = this.dressing.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
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

    price(){
        let foundationPrice = 1.3 * this.foundation.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let proteinPrice = this.protein.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let extrasPrice = 0.5 * this.extra.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let dressingPrice = this.dressing.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        return foundationPrice + proteinPrice + extrasPrice + dressingPrice;
    }
}

class GourmetSalad extends Salad {
    constructor(){
        super();
    }

    price(foundationMul = 1.0, proteinMul = 1.0, extraMul = 1.0, dressingMul = 1.0){
        let foundationPrice = foundationMul * this.foundation.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let proteinPrice = proteinMul * this.protein.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let extrasPrice = extraMul * this.extra.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        let dressingPrice = dressingMul * this.dressing.map((x => imported.inventory[x]['price'])).reduce((x, xs) => x + xs);
        return foundationPrice + proteinPrice + extrasPrice + dressingPrice;
    }
}

// console.log(imported.inventory['Sallad']['foundation'])

let myCesarSalad = new Salad();
console.log(myCesarSalad);
myCesarSalad.addSelection("Salad + Quinoa"); // 10
myCesarSalad.addSelection('Kycklingfilé'); // 10
myCesarSalad.addSelection('Tomat'); // 5
myCesarSalad.addSelection('Parmesan'); // 5
myCesarSalad.addSelection('Parmesan'); // 5
myCesarSalad.addSelection('Ceasardressing'); // 5
myCesarSalad.addSelection('Bacon');
console.log(myCesarSalad);
// console.log(myCesarSalad.price());

// let mySalad = new ExtraGreenSalad();
// mySalad.addSelection("Salad + Quinoa"); // 10
// mySalad.addSelection('Kycklingfilé'); // 10
// mySalad.addSelection('Tomat'); // 5
// mySalad.addSelection('Parmesan'); // 5
// mySalad.addSelection('Ceasardressing'); // 5
// console.log(mySalad.price());