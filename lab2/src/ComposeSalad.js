import React, { Component } from 'react';

class ComposeSalad extends Component {
    constructor(props) {
        super(props);
        this.state = {foundation : '', proteins : [], extras : [], dressing : ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

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
                        <select onChange={this.handleChange}>
                            {foundations.map(name => <option value={name}>{name}</option>)}
                        </select>
                    </label>

                    <div>
                        <label>
                            Choose protein:
                            {proteins.map(name =>
                                <div>
                                    <input type="checkbox" id={name}></input>
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
                                    <input type="checkbox" id={name}></input>
                                    <label>{name}</label>
                                </div>
                            )}
                        </label>
                    </div>

                    <label>
                        Choose dressing:
                        <select onChange={this.handleChange}>
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