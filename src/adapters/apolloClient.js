import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri debe ser tu IPv4 local de WSL, no localhost
  uri: 'http://localhost:8000/gql',
  cache: new InMemoryCache()
});

export default client;
