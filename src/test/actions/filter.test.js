import {setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount} from '../../actions/filter'
import moment from 'moment';

test('should generate set start date action object', ()=> {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type:'START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', ()=> {
    const action = setEndDate(moment(0));

    expect(action).toEqual({
        type: 'END_DATE',
        endDate: moment(0)
    });
});

test('should generate set text action object', ()=> {
    const action = setTextFilter('test' );

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
         text: 'test'
        
    });
});
test('should generate set text default action object', ()=> {
    const action = setTextFilter( );

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
         text: ''
        
    });
});

test('should generate sort by date action object', ()=> {
    const action = sortByDate();

    expect(action).toEqual({
        type: 'SORT_BY_DATE'

    });

});

test('should generate sort by amunt action object', ()=> {
    const action = sortByAmount();

    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'

    });

});



