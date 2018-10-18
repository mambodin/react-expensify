import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'react-dates/initialize';
import AppRouter from './routers/AppRouter';
import configureStore from './stores/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filter';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();


store.dispatch((addExpense({ description: 'water bill', amount: 100, createdAt: -210 })));
store.dispatch((addExpense({ description: 'gas bill', amount: 2000, createdAt: -1000 })));
store.dispatch((addExpense({ description: 'rent bill', amount: 2500, createdAt: 10800 })));



const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));
