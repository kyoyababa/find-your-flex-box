import FindYourFlexBoxDispatcher from '../dispatcher/FindYourFlexBoxDispatcher'
export const SAY_SOMETHING = 'SAY_SOMETHING'

const FindYourFlexBoxActions = {
  saySomething(word) {
    FindYourFlexBoxDispatcher.dispatch({
      actionType: SAY_SOMETHING,
      word
    });
  }
};

export default FindYourFlexBoxActions
