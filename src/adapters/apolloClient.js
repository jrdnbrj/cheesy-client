import { ApolloClient, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  uri: 'http://localhost:8000/gql',
  cache: new InMemoryCache()
})

export default client
