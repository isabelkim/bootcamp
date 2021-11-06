import React from 'react';

import { Link } from 'react-router-dom';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/editor">Card Editor</Link>
        <br />
        <Link to="/viewer">Card Viewer</Link>
      </div>
    )
  }
}

export default Homepage;