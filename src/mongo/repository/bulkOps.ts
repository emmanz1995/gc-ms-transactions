export default (Model: any) => async (transactions: any[]) => {
  const bulkOps = transactions.map(transaction => ({
    updateOne: {
      filter: { _id: transaction.transactionId },
      update: { $set: transaction },
      upsert: true,
    },
  }));

  let bulkingTransaction;
  try {
    bulkingTransaction = await Model.bulkWrite(bulkOps);

    console.log(`Matched: ${bulkingTransaction.matchedCount}`);
    console.log(`Modified: ${bulkingTransaction.modifiedCount}`);
    console.log(`Inserted: ${bulkingTransaction.upsertedCount}`);
  } catch (err) {
    console.error('Error during bulkWrite operation:', err);
  }

  return bulkingTransaction;
};
