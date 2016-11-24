import React    from 'react';
import ReactDOM from 'react-dom';
import Form     from './Form.react';
import List	    from './List.react';
import Console  from 'console-browserify';

class CardCollec extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <Form filter={this.props.location.query}/>
      <List />
    </div>;
  }
}

export default CardCollec;