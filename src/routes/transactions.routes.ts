import { Router } from 'express';
import {getCustomRepository, Transaction} from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload'; 
import multer from 'multer';

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
    const TransactionRepository = getCustomRepository(TransactionsRepository);
    const transactions = await TransactionRepository.find();

    const balance = await TransactionRepository.getBalance();

    return response.json({transactions, balance});

});

transactionsRouter.post('/', async (request, response) => {
    const {title, value, type, category}= request.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category
    })

    return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
    const {id} = request.body;

    const DeleteTransaction = new DeleteTransactionService();

    await DeleteTransaction.execute(id);

    return response.status(204).send();
});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
    
      const importTransactions = new ImportTransactionsService();

      const transactions = await importTransactions.execute(request.file.path);
      return response.json(transactions);
    }
);

export default transactionsRouter;
