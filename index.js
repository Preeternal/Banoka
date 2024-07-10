/**
 * @format
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import 'react-native-devsettings';

import { ApolloProvider } from '@apollo/client';

import { store, persistor } from './src/store';
import client from './src/client';
import App from './src/screens';
import { name as appName } from './app';
import { Screen } from './src/components/common';

const Start = () => {
    const [gateLifted, setGateLifted] = useState(false);
    const onBeforeLift = () => {
        setTimeout(() => {
            setGateLifted(true);
        }, 2000);
    };

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate
                    loading={<Screen />}
                    persistor={persistor}
                    onBeforeLift={onBeforeLift}>
                    {gateLifted ? <App /> : <Screen />}
                </PersistGate>
            </Provider>
        </ApolloProvider>
    );
};

AppRegistry.registerComponent(appName, () => Start);
