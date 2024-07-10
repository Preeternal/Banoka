import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { devToolsEnhancer } from '@redux-devtools/remote';
import { composeWithDevTools } from '@redux-devtools/remote';

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // stateReconciler: autoMergeLevel2,
    // stateReconciler: hardSet,
    // blacklist: ['depo', 'credit'],
    whitelist: ['converter', 'settings'],
    // debug: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// const composeEnhanced = require('@redux-devtools/remote').composeWithDevTools({
//     secure: false,
//     realtime: true,
//     hostname: 'localhost',
//     port: 8000,
// });

// const composeEnhancers = composeWithDevTools({
//     secure: false,
//     realtime: true,
//     hostname: 'localhost',
//     port: 8000,
// });

const store = createStore(
    persistedReducer,
    // composeEnhancers(),
    // devToolsEnhancer(),
    composeWithDevTools(),
    // __DEV__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistor = persistStore(store);

export { store, persistor };
