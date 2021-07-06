import { ApolloClient, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'http://138.68.26.239/gql' : 'http://localhost:8000/gql',
  cache: new InMemoryCache()
})

export default client
