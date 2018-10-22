import authReducer from '../../reducers/auth'

test('should login a user and store uid', () => {
    const action = {
        type:'LOGIN',
        uid: '123'
    };

    const state = authReducer(undefined, action)
    expect(state.uid).toEqual(action.uid);
});

test('should logout a user and clear store uid', () => {
    const action = {
        type: 'LOGOUT'
    };

    const state = authReducer(undefined, action);
    expect(state).toEqual({});
});