import {addExpense, editExpense, removeExpense} from '../../actions/expenses';


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
    const expenseData = {
        description:'Rent',
        amount:1400,
        createdAt: 1000,
        note:'this is just rent'
    };

    const action = addExpense(expenseData);

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id: expect.any(String)

        }
    })
});

test('it should setup add expense action object with default values', () => {

    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: { description: '',
        note:'',
        amount: 0,
        createdAt: 0,
        id: expect.any(String) }
        
    })
});