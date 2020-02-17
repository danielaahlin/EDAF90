import React, { Component } from 'react';
var Salad = require('./Salad')

class ComposeSalad extends Component {
    constructor(props) {
        super(props);
        this.state = {foundation : '', proteins : [], extras : [], dressing : ''};
        this.counter = 1;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.target.parentElement.classList.add("was-validated");

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (target.type === 'checkbox'){
            let toUpdate = this.state[name];
            if(value === true){
                toUpdate.push(target.id);
            } else {
                toUpdate.pop(target.id);
            }
            this.setState({
                [name] : toUpdate
            });
        } else {
            this.setState({
                [name] : value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        event.target.classList.add("was-validated");

        if(event.target.checkValidity() === false){
            // alert('Please make sure that your order contains foundation and dressing.');
            return;
        }

        let salad = new Salad();

        salad.addSelection(this.state.foundation);
        this.state.proteins.map(x => salad.addSelection(x));
        this.state.extras.map(x => salad.addSelection(x))
        salad.addSelection(this.state.dressing);

        this.setState({
            foundation : '', proteins : [], extras : [], dressing : '' 
        });

        this.state.proteins.map(x => document.getElementById(x).checked = false);
        this.state.extras.map(x => document.getElementById(x).checked = false);

        this.props.func({salad : salad, id : this.counter++, price : salad.price()});

        this.props.history.push('/view-order');
    }

    render() {
        const inventory = this.props.inventory;
        let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        let extras = Object.keys(inventory).filter(name => inventory[name].extra);
        let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} noValidate>
                    <label>
                        Choose foundation:
                        <select required className="form-control" name='foundation' value={this.state.foundation} onChange={this.handleChange}>
                            <option value=''></option>
                            {foundations.map(name => <option value={name} key={name}>{name} +{inventory[name].price}kr</option>)}
                        </select>
                        <div className='invalid-feedback'>Required, select one</div>
                    </label>

                    <div>
                        <label>
                            Choose protein:
                            {proteins.map(name =>
                                <div key={name}>
                                    <input type="checkbox" className="form-check-input" id={name} name='proteins' onChange={this.handleChange}></input>
                                    <label>{name} +{inventory[name].price}kr </label>
                                </div>
                            )}
                        </label>
                    </div>

                    <div>
                        <label>
                            Choose extras:
                            {extras.map(name =>
                                <div key={name}>
                                    <input type="checkbox" className="form-check-input" id={name} name='extras' onChange={this.handleChange}></input>
                                    <label>{name} +{inventory[name].price}kr</label>
                                </div>
                            )}
                        </label>
                    </div>

                    <label>
                        Choose dressing:
                        <select required className="form-control" name='dressing' value={this.state.dressing} onChange={this.handleChange}>
                            <option value=''></option>
                            {dressings.map(name => <option value={name} key={name}>{name} +{inventory[name].price}kr</option>)}
                        </select>
                        <div className='invalid-feedback'>Required, select one</div>
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default ComposeSalad;