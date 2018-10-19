import React from 'react';
import getExpensesTotal from '../../selectors/expenses-total'
import moment from 'moment';

const expenses = [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
        id: '2',
        description: 'Rent',
        note: '',
        amount: 109500,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    }, {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(4, 'days').valueOf()
    }];

test('should add all expenses', () => {
    const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    const result = getExpensesTotal(expenses);

    expect(result).toEqual(total);
}); 

test('should not add all if no expenses', () => {
    
    const result = getExpensesTotal();
    expect(result).toEqual(0);
}); 

test('should only add 1 expense', () => {

    const expense1 = expenses[0]
    const result = getExpensesTotal([expenses[0]]);
    expect(result).toEqual(expenses[0].amount);

}); 