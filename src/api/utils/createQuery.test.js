import createQuery from './createQuery';

describe('createQuery', () => {
  it('should return default query string when no parameters are provided', () => {
    const result = createQuery({});
    expect(result).toBe('?q=&per_page=50&virtual_hosts=EXCLUDE&sort=RELEVANCE');
  });

  it('should include query parameter when q is provided', () => {
    const result = createQuery({ q: 'service_name:HTTP' });
    expect(result).toBe(
      '?q=service_name%3AHTTP&per_page=50&virtual_hosts=EXCLUDE&sort=RELEVANCE',
    );
  });

  it('should include per_page when a custom value is provided', () => {
    const result = createQuery({ per_page: 25 });
    expect(result).toBe('?q=&per_page=25&virtual_hosts=EXCLUDE&sort=RELEVANCE');
  });

  it('should include virtual_hosts when a custom value is provided', () => {
    const result = createQuery({ virtual_hosts: 'INCLUDE' });
    expect(result).toBe('?q=&per_page=50&virtual_hosts=INCLUDE&sort=RELEVANCE');
  });

  it('should include sort when a custom value is provided', () => {
    const result = createQuery({ sort: 'ASCENDING' });
    expect(result).toBe('?q=&per_page=50&virtual_hosts=EXCLUDE&sort=ASCENDING');
  });

  it('should include cursor when it is provided', () => {
    const result = createQuery({ cursor: 'abc123' });
    expect(result).toBe(
      '?q=&per_page=50&virtual_hosts=EXCLUDE&sort=RELEVANCE&cursor=abc123',
    );
  });

  it('should correctly construct a complex query string with all parameters', () => {
    const params = {
      q: 'service_name:HTTP',
      per_page: 30,
      virtual_hosts: 'ONLY',
      sort: 'DESCENDING',
      cursor: 'cursor123',
    };
    const result = createQuery(params);
    expect(result).toBe(
      '?q=service_name%3AHTTP&per_page=30&virtual_hosts=ONLY&sort=DESCENDING&cursor=cursor123',
    );
  });

  it('should handle special characters in q parameter', () => {
    const result = createQuery({ q: 'name:example+service' });
    expect(result).toBe(
      '?q=name%3Aexample%2Bservice&per_page=50&virtual_hosts=EXCLUDE&sort=RELEVANCE',
    );
  });
});
