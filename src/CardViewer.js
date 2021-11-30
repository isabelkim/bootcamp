import React from 'react';
// import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found!</div>;
    }

    console.log(this.props.cards)
    const card = this.props.cards[this.state.index][this.state.cardFront ? 'front' : 'back'];
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h4>Card {this.state.index + 1} out of {this.props.cards.length}</h4>
        <button onClick = {this.flipCard}>{card}</button>
        <hr />
        <button onClick = {this.previousCard}>Previous Card</button>
        <button onClick = {this.nextCard}>Next Card</button>
        <hr />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return { cards: cards, name: name };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
  }),
  connect(mapStateToProps),
)(CardViewer);