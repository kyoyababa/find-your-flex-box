import FindYourFlexBoxDispatcher from '../dispatcher/FindYourFlexBoxDispatcher';
import { EventEmitter } from 'events';
import { SAY_SOMETHING, STYLE_SELECTED } from '../actions/FindYourFlexBoxActions';

const CHANGE_EVENT = 'change'
let _states = {
  word: '',
  headlines: {
    default: true,
    selected: false
  }
}

function setWord(word) {
  _states.word = word
}

function setHeadlineClass() {
  _states.headlines.default = false;
  _states.headlines.selected = true;
}

const FindYourFlexBoxStore = Object.assign({}, EventEmitter.prototype, {
  getStates() {
    return _states;
  },

  emitChange: function() {
   this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

FindYourFlexBoxDispatcher.register((action) => {
  switch(action.actionType) {
    case STYLE_SELECTED:
      setHeadlineClass('shown');
      FindYourFlexBoxStore.emitChange();
      break;

    default:
      throw new Error(`The action ${action} in dispatcher is not under consideration!`);
  }
});

export default FindYourFlexBoxStore;
