//@ts-ignore
import { goCardlessClient } from 'go-cardless-client-lib/dist';
import { cache } from '../helpers';

const getToken = async (tokens: object) =>
  await goCardlessClient({
    url: `${process.env.BASE_URL}/api/v2/token/new/`,
    method: 'POST',
    tokens,
  });

const retrieveToken = async () => {
  const cached_token: any = cache.get('cached_token');
  if (cached_token) return cached_token;

  const { SECRET_KEY, SECRET_ID } = process.env;

  const secrets = {
    secret_id: SECRET_ID,
    secret_key: SECRET_KEY,
  };

  const tokens = await getToken(secrets)

  console.log(`...caching accessToken:`, tokens);
  const TTL = 36000;
  cache.set('cached_token', tokens, TTL);
  return tokens;
};
const institutionsLookup = async (country: string, accessToken: string) =>
  await goCardlessClient({
    url: `${process.env.BASE_URL}/api/v2/institutions?country=${country}`,
    method: 'GET',
    body: null,
    accessToken
  });

export const goCardless = {
  retrieveToken,
  institutionsLookup,
};
