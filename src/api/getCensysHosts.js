import { CENSYS_HOSTS_ENDPOINT, HOSTS_SEARCH } from './constants';
import createQuery from './utils/createQuery';

/**
 * Fetches host information from the Censys API based on the provided query parameters.
 *
 * @param {{
 *   query: string,
 *   pageToken?: string
 * }} params - The parameters for the API request.
 *   @param {string} params.query - The search query string used to filter hosts.
 *   @param {string} [params.pageToken] - An optional cursor token for pagination to fetch the next or previous page of results.
 *
 * @returns {Promise<{
 *   query: string,
 *   hits: Array<{
 *     ip: string,
 *     services: Array<{ port: number, service_name: string, transport_protocol: string, certificate?: string }>,
 *     location: { continent: string, country: string, country_code: string, postal_code: string, timezone: string, coordinates: { latitude: string, longitude: string }, registered_country: string, registered_country_code: string },
 *     autonomous_system: { asn: number, description: string, bgp_prefix: string, name: string, country_code: string }
 *   }>,
 *   prev: string,
 *   next: string
 * }>} The API response formatted for UI use, containing `query`, `hits`, `prev`, and `next` properties.
 *
 * @throws {{
 *   code: number,
 *   status: string,
 *   error: string
 * }} If the backend returns an error response, throws an object with `code`, `status`, and `error` properties.
 * @throws {Error} Throws a generic error with a network-related message if there is a network failure.
 */
const getCensysHosts = async ({ query, pageToken }) => {
  // Not safe to store secrets in the repo. Only for the assesment sake
  const CENSYS_API_ID = process.env.REACT_APP_CENSYS_API_ID;
  const CENSYS_API_SECRET = process.env.REACT_APP_CENSYS_API_SECRET;

  // Basic Auth encoded credentials
  const encodedCredentials = btoa(`${CENSYS_API_ID}:${CENSYS_API_SECRET}`);

  const headers = new Headers({
    Accept: 'application/json',
    Authorization: `Basic ${encodedCredentials}`,
  });

  const requestOptions = {
    method: 'GET',
    headers,
  };

  const url =
    CENSYS_HOSTS_ENDPOINT +
    HOSTS_SEARCH +
    createQuery({ q: query, cursor: pageToken });

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      // If the backend responds with an error status, throw the error data directly
      throw {
        code: data.code || response.status,
        status: data.status || response.statusText,
        error: data.error || 'An error occurred',
      };
    }

    console.log('Success:', data);
    const { result } = data;
    const {
      query,
      hits = { hits: [] },
      links: { prev = '', next = '' } = {},
    } = result;

    return { query, hits, prev, next };
  } catch (error) {
    // Network errors don't have a response object; handle them separately
    if (!error.code) {
      console.error('Network Error:', error);
      throw new Error(
        'Network error: Unable to reach the server. Please try again later.',
      );
    }
    // If it's an API error, log it for debugging and re-throw it
    console.error('API Error:', error);
    throw error;
  }
};

export default getCensysHosts;
