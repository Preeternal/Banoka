import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import DepoReducer from './DepoReducer';
import CreditReducer from './CreditReducer';
import ConverterReducer from './ConverterReducer';
import SettingsReducer from './SettingsReducer';

const depoPersistConfig = {
    key: 'depo',
    storage: AsyncStorage,
    blacklist: ['dateOpen', 'dateClosed'],
};

const creditPersistConfig = {
    key: 'credit',
    storage: AsyncStorage,
    blacklist: ['creditDateOpen'],
};

const rootReducer = combineReducers({
    depo: persistReducer(depoPersistConfig, DepoReducer),
    credit: persistReducer(creditPersistConfig, CreditReducer),
    converter: ConverterReducer,
    settings: SettingsReducer,
});

export default rootReducer;
