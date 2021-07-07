import { ApolloClient, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'https://144.126.222.169/gql' : 'http://localhost:8000/gql',
  cache: new InMemoryCache()
})

export default client
