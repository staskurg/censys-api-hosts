/**
 * Constructs a query string for the Censys API based on the provided parameters.
 *
 * @param {{
 *   q: string,
 *   per_page?: number,
 *   virtual_hosts?: 'EXCLUDE' | 'INCLUDE' | 'ONLY',
 *   sort?: 'RELEVANCE' | 'ASCENDING' | 'DESCENDING',
 *   cursor?: string
 * }} params - The parameters for the query.
 *   @param {string} params.q - The query string used to search for hosts with matching attributes.
 *   @param {number} [params.per_page=50] - The maximum number of hits to return per response (1 to 100). Default is 50.
 *   @param {'EXCLUDE' | 'INCLUDE' | 'ONLY'} [params.virtual_hosts='EXCLUDE'] - Determines how to query Virtual Hosts. Default is "EXCLUDE".
 *   @param {'RELEVANCE' | 'ASCENDING' | 'DESCENDING'} [params.sort='RELEVANCE'] - Sort order of results. Default is "RELEVANCE".
 *   @param {string} [params.cursor] - Cursor token for pagination to fetch the next or previous page of hits.
 *
 * @returns {string} The constructed query string to append to the endpoint URL.
 */
const createQuery = ({
  q = '',
  per_page = 50,
  virtual_hosts = 'EXCLUDE',
  sort = 'RELEVANCE',
  cursor = '',
}) => {
  let query = `?q=${encodeURIComponent(q)}&per_page=${per_page}&virtual_hosts=${virtual_hosts}&sort=${sort}`;
  if (cursor) {
    query += `&cursor=${cursor}`;
  }
  return query;
};

export default createQuery;
