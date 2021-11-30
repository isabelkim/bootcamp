import React from 'react';

import { Link } from 'react-router-dom';

import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
  render() {
    if (!isLoaded(this.props.decks)) {
      return <div>Loading...</div>;
    }

    console.log(this.props.decks)
    const keys = Object.keys(this.props.decks)

    const decks = keys.map((deck, index) => {
      return (
        <div>
          <Link to={`/viewer/${deck}`} key={index}>{this.props.decks[deck].name}</Link>
          <br />
        </div>
      )
    })

    return (
      <div>
        <h3>Homepage</h3>
        <Link to="/editor">Create a new card deck</Link>
        <br />
        <h4>Flashcards</h4>
        {decks}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return{ decks: state.firebase.data.decks }
};

export default compose(
  firebaseConnect(props => {
    return [{ path: `/homepage`, storeAs: 'decks' }];
  }),
  connect(mapStateToProps),
)(Homepage);