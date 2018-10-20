import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});
test('should not expenses if id not found', () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});
test('should add an expense ', () => {
    const expense = {

        description: 'New Expensive Expense',
        amount: 34885774,
        createdAt: 0
    }

    const action = {
        type:'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, expense]);
});
test('should edit an expense ', () => {
    const action = {
        type:'EDIT_EXPENSE',
        expense
    }

    const expense = {
        id:'2',
        amount: 23425325
    }
    const state = expensesReducer(expenses, action);

    expect(state.amount).toEqual(action.amount);
});
test('should not edit an expense when no ID', () => {
    const action = {
        type:'EDIT_EXPENSE',
        expense
    }

    const expense = {
        id:'5',
        amount: 23425325
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should set expenses', () => {

    const action = {
        type:'SET_EXPENSES',
        expenses
    };

    const expenses2 = [{}];

    let state = expensesReducer(expenses2, action);
     state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);

});