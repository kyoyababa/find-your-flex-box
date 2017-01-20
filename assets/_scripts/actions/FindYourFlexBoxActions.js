import FindYourFlexBoxDispatcher from '../dispatcher/FindYourFlexBoxDispatcher';
export const STYLE_SELECTED = 'STYLE_SELECTED';

const FindYourFlexBoxActions = {
  isSelectedSomething(element) {
    FindYourFlexBoxDispatcher.dispatch({
      actionType: STYLE_SELECTED,
      element
    });
  }
};

export default FindYourFlexBoxActions;
