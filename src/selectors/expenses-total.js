 
 const getExpensesTotal = (expenses) => {
    if(expenses)   
    {
     return expenses
         .map((expense) => expense.amount)
         .reduce((sum, value) => sum + value, 0);
    }
    else return 0;
 };

export default getExpensesTotal;

