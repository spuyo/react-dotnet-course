import React, { Component } from 'react';

export class Scramble extends Component {
    static displayName = Scramble.name;

    constructor(props) {
        super(props);
        this.state = { wordToScramble: "", loading: false, unscrambled: true };
        this.submitScramble = this.submitScramble.bind(this);
    }

    submitScramble() {
        let wordToScramble = document.getElementById("wordToScramble").value;
        this.setState({
            wordToScramble: wordToScramble,
            loading: true
        });
        this.fetchScrambleWorld(wordToScramble);
    }

    async fetchScrambleWorld(wordToScrambled) {
        const response = await fetch('scramble/' + wordToScrambled);
        const data = await response.text();
        this.setState({ wordToScramble: data, loading: false, unscrambled: false});
    }

     static renderScrambleWorld(scrambledWord) {
         return (
             <div>{scrambledWord}</div>
         )
     }

    render() {

        let contents = 
        <div> 
            <input type="text" id="wordToScramble" />
            <button type="button" onClick={this.submitScramble}>Scramble</button>        
        </div>

        if (this.state.loading) {
            contents = <p><em>Loading</em></p>
        } else if (!this.state.unscrambled) {
            contents = Scramble.renderScrambleWorld(this.state.wordToScramble);     
        }

        return (
            <div>
                Please type the word to scramble and click "Scramble"
                {contents}
            </div>
        );
    }


}