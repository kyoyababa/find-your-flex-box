import React, { Component, PropTypes } from 'react'
import FindYourFlexBoxStore from '../stores/FindYourFlexBoxStore'
import FindYourFlexBoxActions from '../actions/FindYourFlexBoxActions'

function getSapmleState() {
  return {
    sample: FindYourFlexBoxStore.getSample()
  };
}

class FindYourFlexBoxController extends Component{
  constructor(props){
    super(props)
    this._onChange = this._onChange.bind(this)
    this.state = getSapmleState()
  }

  componentDidMount() {
    FindYourFlexBoxStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FindYourFlexBoxStore.removeChangeListener(this._onChange);
  }

  handleClick(){
    FindYourFlexBoxActions.saySomething("hello");
  }

  render(){
    return(
      <div>
        <input type="button" value="click" onClick={this.handleClick} />
        <h1>{this.state.sample.word}</h1>
      </div>
    )
  }

  _onChange() {
    this.setState(getSapmleState());
  }
}

export default FindYourFlexBoxController
