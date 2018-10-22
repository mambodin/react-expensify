import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, 
editExpense, 
removeExpense, startRemoveExpense,
setExpenses, startSetExpenses, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);
const uid = 'thisisatest';
const defaultAuthState = {auth:{uid}};

beforeEach((done)=>{
    const expensesData = {};
        expenses.forEach(({id, description, note, amount, createdAt}) => {
            expensesData[id] = {description, note, amount, createdAt};
        });
   
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=> {
        done();
    });
});

test('should setup remove expense action object' ,() => {
    const id = '123';
    const action = removeExpense(id);
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id: '123'
    })
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        amount: 33322
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
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
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDataDefault);
        done();
    });
});

test('should setup set expense action object with data', ()=> {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        });
        done();
    });
    
});
