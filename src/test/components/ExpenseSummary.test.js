import React from 'react';
import { shallow } from 'enzyme';
import {ExpenseSummary}  from '../../components/ExpenseSummary';



test('should render ExpenseSummary with 1 Expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={235} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with  multiple Expenses', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={23} expensesTotal={23425235} />);

    expect(wrapper).toMatchSnapshot();
});