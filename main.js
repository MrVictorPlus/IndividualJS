const fs = require('fs');

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions;
    }

    // Добавляет новую транзакцию в массив транзакций.
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    // Возвращает массив всех транзакций.
    getAllTransactions() {
        return this.transactions;
    }

    // Возвращает массив уникальных типов транзакций.
    getUniqueTransactionTypes() {
        const types = new Set();
        this.transactions.forEach(transaction => {
            types.add(transaction.transaction_type);
        });
        return Array.from(types);
    }

    // Вычисляет общую сумму всех транзакций.
    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => {
            return total + parseFloat(transaction.transaction_amount);
        }, 0);
    }

    // Вычисляет общую сумму транзакций за указанную дату.
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            if (
                (!year || transactionDate.getFullYear() === year) &&
                (!month || transactionDate.getMonth() + 1 === month) &&
                (!day || transactionDate.getDate() === day)
            ) {
                total += parseFloat(transaction.transaction_amount);
            }
            return total;
        }, 0);
    }

    // Возвращает массив транзакций указанного типа.
    getTransactionsByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    // Возвращает массив транзакций, проведенных в указанном диапазоне дат.
    getTransactionsInDateRange(startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    // Возвращает массив транзакций, совершенных с указанным торговым местом или компанией.
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    // Вычисляет среднее значение транзакций.
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    // Возвращает массив транзакций с суммой в заданном диапазоне.
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    // Вычисляет общую сумму дебетовых транзакций.
    calculateTotalDebitAmount() {
        return this.transactions.reduce((total, transaction) => {
            if (transaction.transaction_type === 'debit') {
                total += parseFloat(transaction.transaction_amount);
            }
            return total;
        }, 0);
    }

    // Возвращает номер месяца, в котором было больше всего транзакций.
    findMostTransactionsMonth() {
        const months = new Array(12).fill(0);
        this.transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth();
            months[month]++;
        });
        const maxTransactions = Math.max(...months);
        return months.indexOf(maxTransactions) + 1; // Adding 1 because months are zero-based
    }

    // Возвращает номер месяца, в котором было больше всего дебетовых транзакций.
    findMostDebitTransactionMonth() {
        const debitTransactions = this.getTransactionsByType('debit');
        const months = new Array(12).fill(0);
        debitTransactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth();
            months[month]++;
        });
        const maxTransactions = Math.max(...months);
        return months.indexOf(maxTransactions) + 1; // Adding 1 because months are zero-based
    }

    // Возвращает тип транзакций, которых больше всего.
    mostTransactionTypes() {
        const debitCount = this.getTransactionsByType('debit').length;
        const creditCount = this.getTransactionsByType('credit').length;
        if (debitCount > creditCount) {
            return 'debit';
        } else if (debitCount < creditCount) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    // Возвращает массив транзакций, совершенных до указанной даты.
    getTransactionsBeforeDate(date) {
        date = new Date(date);
        return this.transactions.filter(transaction => {
            return new Date(transaction.transaction_date) < date;
        });
    }

    // Возвращает транзакцию по ее уникальному идентификатору.
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    // Возвращает массив описаний всех транзакций.
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
}

// Reading transactions from JSON file
const rawData = fs.readFileSync('transactions.json');
const transactions = JSON.parse(rawData);

// Creating TransactionAnalyzer instance
const analyzer = new TransactionAnalyzer(transactions);
