//@ts-ignore
import { goCardlessClient } from 'go-cardless-client-lib/dist';
import { cache } from '../helpers';

// const getToken = async (body: object) =>
//   await goCardlessClient({
//     url: `${process.env.BASE_URL}/api/v2/token/new`,
//     method: 'POST',
//     body,
//   });

// const retrieveToken = async () => {
//   const cached_token: any = cache.get('cached_token');
//   if (cached_token) return cached_token;

//   const { SECRET_KEY, SECRET_ID } = process.env;

//   const secrets = {
//     secret_id: SECRET_ID,
//     secret_key: SECRET_KEY,
//   };

//   const tokens = await getToken(secrets)

//   console.log(`...caching accessToken:`, tokens);
//   const TTL = 36000;
//   cache.set('cached_token', tokens, TTL);
//   return tokens;
// };

export const getAccessToken = async (body: object) =>
  await goCardlessClient({
    url: `${process.env.BASE_URL}/api/v2/token/new/`,
    method: 'POST',
    body,
  });

export const retrieveAccessToken = async () => {
  // const cachedToken = nodeCacheStore.get('token_cached');
  const cachedToken = cache.get('token_cached');

  if (cachedToken) return cachedToken;

  const { SECRET_KEY, SECRET_ID } = process.env;

  const secrets = {
    secret_id: SECRET_ID,
    secret_key: SECRET_KEY,
  };
  const accessToken = await getAccessToken(secrets);

  const ttl = 36000;
  const cacheTTL = Math.max(ttl, 900);
  console.log(`...caching accessToken:`, accessToken);

  cache.set('token_cached', accessToken, cacheTTL);
  return accessToken;
};

const institutionsLookup = async (country: string, accessToken: string) =>
  await goCardlessClient({
    url: `${process.env.BASE_URL}/api/v2/institutions?country=${country}`,
    method: 'GET',
    body: null,
    access_token: accessToken,
  });

export const goCardless = {
  retrieveAccessToken,
  institutionsLookup,
};
