import {login, logout} from '../../actions/auth';


test('should login a user', () => {
    const uid = {uid:'1123'};
    const action = login(uid);
    expect(action).toEqual({
        type:'LOGIN',
        uid
    });
});

test('should logout a user', () => {
    const action = logout();
    expect(action).toEqual({
        type:'LOGOUT'
    });
}); 