import React from 'react';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardFront: true, index: 0}
  }
  
  flipCard = () => this.setState({ cardFront: !this.state.cardFront });

  previousCard = () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1})
    }
  };

  nextCard = () => {
    if (this.state.index < this.props.cards.length - 1) {
      this.setState({ index: this.state.index + 1})
    }
  };

  render() {
    const card = this.props.cards[this.state.index][this.state.cardFront ? 'front' : 'back'];
    return (
      <div>
        <h2>Card Viewer</h2>
        <h4>Card {this.state.index + 1} out of {this.props.cards.length}</h4>
        <button onClick = {this.flipCard}>{card}</button>
        <hr />
        <button onClick = {this.previousCard}>Previous Card</button>
        <button onClick = {this.nextCard}>Next Card</button>
        <hr />
        <button onClick={this.props.switchMode}>Go to card editor</button>
      </div>
    );
  }
}

export default CardViewer;