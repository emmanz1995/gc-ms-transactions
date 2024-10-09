import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  creditorName: {
    type: String,
    required: true,
  },
  bankTransactionType: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  processedDate: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

export const transactions = mongoose.model('transactions', transactionSchema);
