import axios from 'axios';

const connectorHelper = async (
  url: string,
  method: string = 'GET',
  body?: object,
  headers?: object
): Promise<object> => {
  let data: object;

  const headersOpt = {
    'content-type': 'application/json',
    accept: 'application/json',
    ...headers,
  };

  try {
    ({ data } = await axios({
      url,
      method,
      ...(body ? { data: JSON.stringify(body) } : null),
      headers: headersOpt,
    }));
  } catch (err: any) {
    console.log('Failed to make request', err);
    throw new Error('Failed to make request');
  }

  return data;
};

export default connectorHelper;
