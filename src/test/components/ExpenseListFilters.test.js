import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import { filters, filters2 } from '../fixtures/filters';
import moment from 'moment'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach (() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with filters2', () => {
    wrapper.setProps({
        filters: filters2
    })
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {

wrapper.find('input').simulate('change',{
    target: {
        value: filters2.text
    }
});

expect(setTextFilter).toHaveBeenLastCalledWith(filters2.text);

});

test('should sort by date', () => {
wrapper.find('select').simulate('change',{
    target:{
        value: 'date'
    }
});

expect(sortByDate).toHaveBeenCalled();

});

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: {
            value: 'amount'
        }
    });

    expect(sortByAmount).toHaveBeenCalled();

});

test('should handle date change', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
    startDate, endDate
});

expect(setStartDate).toHaveBeenLastCalledWith(startDate);
expect(setEndDate).toHaveBeenLastCalledWith(endDate);

});

test('should handle date focuschange', () => {
    const calendarFocused = 'startDate';

    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);

    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);


});