import React, { Component } from 'react';

class ComposeSalad extends Component {
    constructor(props) {
        super(props);
        this.state = {foundation : '', proteins : [], extras : [], dressing : ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (target.type === 'checkbox'){
            let toUpdate = this.state[name];
            console.log(toUpdate);
            if(value === true){
                toUpdate.push(target.id);
            } else {
                toUpdate.pop(target.id);
            }
            console.log(toUpdate);
            this.setState({
                [name] : toUpdate
            });
        } else {
            this.setState({
                [name] : value
            });
        }

        console.log(this.state);
    }

    handleSubmit(event) {

    }

    render() {
        const inventory = this.props.inventory;
        let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        let extras = Object.keys(inventory).filter(name => inventory[name].extra);
        let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Choose foundation:
                        <select name='foundation' value={this.state.foundation} onChange={this.handleChange}>
                            {foundations.map(name => <option value={name}>{name}</option>)}
                        </select>
                    </label>

                    <div>
                        <label>
                            Choose protein:
                            {proteins.map(name =>
                                <div>
                                    <input type="checkbox" id={name} name='proteins' onChange={this.handleChange}></input>
                                    <label>{name}</label>
                                </div>
                            )}
                        </label>
                    </div>

                    <div>
                        <label>
                            Choose extras:
                            {extras.map(name =>
                                <div>
                                    <input type="checkbox" id={name} name='extras' onChange={this.handleChange}></input>
                                    <label>{name}</label>
                                </div>
                            )}
                        </label>
                    </div>

                    <label>
                        Choose dressing:
                        <select name='dressing' value={this.state.dressing} onChange={this.handleChange}>
                            {dressings.map(name => <option value={name}>{name}</option>)}
                        </select>
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default ComposeSalad;