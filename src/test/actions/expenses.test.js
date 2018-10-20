import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object' ,() => {
    const action = removeExpense('123');
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id: '123'
    })
});

test('should edit expense', ()=> {

    const action = editExpense('123', {
        description: 'notRENT',
        amount: '5999'});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id:'123',
        updates: {
            description: 'notRENT',
            amount: '5999'
        }
    });
});

test ('should setup add expense action object with provided values', () => {

    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:expenses[2]
    });
});


test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
         description: 'mice',
         amount: 1200,
         note: 'micro',
         createdAt: 1000
        };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDataDefault = {
        description: '',
        note: '',
        amount:  0,
        createdAt:  0 };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDataDefault
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDataDefault);
        done();
    });
});

// test('it should setup add expense action object with default values', () => {

//     const action = addExpense();

//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: { description: '',
//         note:'',
//         amount: 0,
//         createdAt: 0,
//         id: expect.any(String) }
        
//     })
// });