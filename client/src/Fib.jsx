import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const response = await axios.get('/api/values/current');
        this.setState({ values: response.data });
    }

    async fetchIndexes() {
        const response = await axios.get('/api/values/all');
        this.setState({ seenIndexes: response.data });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = []
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }
        return entries
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index,
        });
        this.setState({ index: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input
                     value={this.state.index}
                     onChange={e => this.setState({ index: e.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;