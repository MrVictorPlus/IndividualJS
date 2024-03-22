// Example usage
console.log("Unique Transaction Types:", analyzer.getUniqueTransactionTypes());
console.log("Total Amount:", analyzer.calculateTotalAmount());
console.log("Total Amount in January 2019:", analyzer.calculateTotalAmountByDate(2019, 1));
console.log("Transactions in Date Range:", analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-15'));
console.log("Transactions by Merchant:", analyzer.getTransactionsByMerchant('SuperMart'));
console.log("Average Transaction Amount:", analyzer.calculateAverageTransactionAmount());
console.log("Total Debit Amount:", analyzer.calculateTotalDebitAmount());
console.log("Most Transactions Month:", analyzer.findMostTransactionsMonth());
console.log("Most Debit Transactions Month:", analyzer.findMostDebitTransactionMonth());
console.log("Most Transaction Types:", analyzer.mostTransactionTypes());
console.log("Transactions Before Date:", analyzer.getTransactionsBeforeDate('2019-01-10'));
console.log("Transaction by ID:", analyzer.findTransactionById("1"));
console.log("Mapped Transaction Descriptions:", analyzer.mapTransactionDescriptions());