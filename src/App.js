// Apollo
import { ApolloProvider } from '@apollo/client/react';
import client from './adapters/apolloClient';

import Routes from "./Routes";


const App = () => {
  return <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
}

export default App;
