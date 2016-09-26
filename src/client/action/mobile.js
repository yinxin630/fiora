import Store from '../store';

const dispatch = Store.dispatch;

const actions = {
    // chat messageList
    shouldScrollMessage: (should) => dispatch({ type: 'ShouldScrollMessage', should }),
};

export default actions;
