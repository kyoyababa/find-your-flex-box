import FindYourFlexBoxDispatcher from '../dispatcher/FindYourFlexBoxDispatcher'
import { EventEmitter } from 'events'
import { SAY_SOMETHING } from '../actions/FindYourFlexBoxActions'

const CHANGE_EVENT = 'change'
let _sample = {word: ''}

function setWord(word){
  _sample.word = word
}

const FindYourFlexBoxStore = Object.assign({}, EventEmitter.prototype, {
  getSample(){
    return _sample
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

// Register callback to handle all updates
FindYourFlexBoxDispatcher.register(function(action) {
  switch(action.actionType) {
    case SAY_SOMETHING:
      setWord(action.word);
      FindYourFlexBoxStore.emitChange();
      break;

    default:
      // no op
  }
});

export default FindYourFlexBoxStore
