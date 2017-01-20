import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import FindYourFlexBoxStore from '../stores/FindYourFlexBoxStore';
import FindYourFlexBoxActions from '../actions/FindYourFlexBoxActions';

function MainControllerState() {
  return {
    states: FindYourFlexBoxStore.getStates()
  };
}


const displayClasses = {
  shownClass: 'shown',
  hiddenClass: 'hidden'
};


class FindYourFlexBoxController extends Component {
  /**
   * common constructors and mounting functions
   **/
  constructor(props){
    super(props),
    this._onChange = this._onChange.bind(this),
    this.state = MainControllerState()
  }

  componentDidMount() {
    FindYourFlexBoxStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FindYourFlexBoxStore.removeChangeListener(this._onChange);
  }

  /**
   * activate headline when something selected
   **/
  // handleStyleSelect(element){
  //   // console.log(this.props)
  //   // console.log(element.currentTarget)
  //   // FindYourFlexBoxActions.saySomething("hello");
  //
  //   FindYourFlexBoxActions.isSelectedSomething(element);
  // }

  /**
   * addClass activation for headlines and items
   **/
  setFilter(isSelected, currentState) {
    this.setState({
      selected: currentState,
      target: isSelected
    });
  }

  isHeadlineShown(headlineValue) {
    return headlineValue === this.state.selected ? '' : displayClasses.hiddenClass;
  }

  isStyleSelected(filter) {
    const selectedClass = 'selected';
    if (filter == this.state.target) return selectedClass;
  }

  render() {
    const $flexBox = <ul>
      <li>foo</li>
      <li>bar</li>
      <li>buz</li>
    </ul>;

    return(
      <div className={'cs-main-inner'}>
        <section className={'cs-box-selection'}>
          <h2>Choose one if you need the popular style box.</h2>
          <ol>
            <li
              className={this.isStyleSelected('st-center-center')}
              onClick={this.setFilter.bind(this, 'selected', 'st-center-center')}>
              {$flexBox}
            </li>
            <li
              className={this.isStyleSelected('st-center-center-wrap')}
              onClick={this.setFilter.bind(this, 'selected', 'st-center-cetner-wrap')}>
              {$flexBox}
            </li>
            <li
              className={this.isStyleSelected('st-center-center-between')}
              onClick={this.setFilter.bind(this, 'selected', 'st-center-center-between')}>
              {$flexBox}
            </li>
            <li
              className={this.isStyleSelected('st-center-center-around')}
              onClick={this.setFilter.bind(this, 'selected', 'st-center-center-around')}>
              {$flexBox}
            </li>
          </ol>
        </section>

        <section>
          <h2 className={this.isHeadlineShown('default')}>
            You want to use the selected style? see below.
          </h2>
          <h2 className={this.isHeadlineShown('selected')}>
            Thanks! flex-box styling would be as follows!
          </h2>
          <div>
            <code>
            </code>

            <code>
            </code>
          </div>
        </section>

        <section>
          <a>Show full sample codes</a>
          <div>
            <code>
            </code>

            <code>
            </code>
          </div>
        </section>
      </div>
    )
  }

  _onChange() {
    this.setState(MainControllerState());
  }
}

export default FindYourFlexBoxController;
