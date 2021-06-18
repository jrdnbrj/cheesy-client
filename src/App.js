// Apollo
import { ApolloProvider } from '@apollo/client/react';
import client from './adapters/apolloClient';

import Routes from "./Routes";

import { Provider } from 'react-redux';
import store from './adapters/store'

const App = () => {
  return <ApolloProvider client={client}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ApolloProvider>
}

export default App;
