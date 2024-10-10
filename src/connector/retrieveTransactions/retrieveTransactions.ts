import connectorHelper from '../connector-helper';

const getTransactions = async (accountId: string) =>
  await connectorHelper(
    `${process.env.URL_GOCARDLESS_TRANSACTIONS}/api/v1/transactions/transactionsDetails/${accountId}`,
    'GET'
  );

export default getTransactions;
