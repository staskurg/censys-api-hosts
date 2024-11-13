# Censys API Hosts Search Client

A simple client-side web application that allows users to search and view IPv4 hosts using the Censys API. The app displays a paginated list of results based on a given search query, showing each host's IP address and the number of associated protocols.

## Table of Contents

- [App Description](#app-description)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Testing Instructions](#testing-instructions)
- [API Reference](#api-reference)
- [Search Query Examples](#search-query-examples)

## App Description

This application allows users to interact with the Censys API to search for IPv4 hosts and explore associated services and protocols. Users can:

1. Enter a plain-text search query to search for hosts.
2. View a list of results that displays each host's IP address and the number of protocols.
3. Navigate through the pages of results using Next and Previous buttons.

This project was created as part of a technical assessment to demonstrate working with a REST API, handling pagination, and implementing a minimal UI.

## Setup Instructions

To set up and run the application locally:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/staskurg/censys-api-hosts.git
   cd censys-api-hosts
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env` file at the root of your project (see [Environment Variables](#environment-variables)).

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner in watch mode.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Checks for linting errors using ESLint.
- **`npm run format`**: Formats code using Prettier.

## Environment Variables

To interact with the Censys API, you need to configure API credentials in a `.env` file located at the root of the project. These credentials are used for authentication when making API requests.

Create a `.env` file with the following content:

```plaintext
REACT_APP_CENSYS_API_ID=your-censys-api-id
REACT_APP_CENSYS_API_SECRET=your-censys-api-secret
```

## Testing Instructions

To test the application:

1. **Unit Tests**:

   - Run `npm test` to execute unit tests.
   - Unit tests are available for core functions such as `createQuery`.

2. **Manual Testing**:
   - Open the app in development mode (`npm start`).
   - Enter various queries in the search field and verify that results appear.
   - Test pagination by clicking the "Next" and "Previous" buttons.
   - Disconnect from the network or modify API credentials to verify error handling for network errors and authorization errors.

## API Reference

This app interacts with the Censys [Search Hosts API](https://search.censys.io/api#/hosts/searchHosts). For additional details on constructing search queries, refer to the [Censys Search Language](https://search.censys.io/search/language).

### Cursor Pagination

The Censys API uses cursor-based pagination. Each response may contain a `links` object with `prev` and `next` cursor tokens, which can be used to navigate between pages. When `next` or `prev` are present, they can be passed as `cursor` parameters to fetch the next or previous page of results.

## Search Query Examples

Here are some sample queries to help you start exploring the Censys API:

- **Search by Service Name**:

  ```plaintext
  services.service_name: HTTP
  ```

  Searches for hosts with HTTP services running on any port.

- **Search by IP Range**:

  ```plaintext
  ip: [192.168.1.0 TO 192.168.1.255]
  ```

  Finds all hosts within a specific IP range.

- **Combine Criteria with Boolean Logic**:

  ```plaintext
  services.port: 443 AND services.service_name: HTTP
  ```

  Searches for hosts with an HTTP service specifically running on port 443.

- **Wildcard Search**:

  ```plaintext
  services.software.vendor: "Micro*"
  ```

  Finds hosts with a service vendor name that begins with "Micro".

- **Using Nested Field Syntax**:

  ```plaintext
  services: (port: 80 AND service_name: "HTTP")
  ```

  Searches for HTTP services running specifically on port 80.

- **Exclude Certain Results**:

  ```plaintext
  NOT services.service_name: FTP
  ```

  Excludes hosts with FTP services.

- **Range Search on HTTP Status Codes**:
  ```plaintext
  services.http.response.status_code: [500 TO 503]
  ```
  Finds hosts that returned HTTP status codes between 500 and 503.

For more complex queries and detailed query language documentation, refer to the [Censys Search Language documentation](https://search.censys.io/search/language).
