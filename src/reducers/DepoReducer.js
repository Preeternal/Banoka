// @flow
import 'number-to-locale-string';
import {
    PRINCIPAL_CHANGED,
    DATE_OPEN_CHANGED,
    DATE_CLOSED_CHANGED,
    INTEREST1_CHANGED,
    INTEREST2_CHANGED,
    PLATEZ_CHANGED,
    PLUSPERIOD_CHANGED,
    PRINPLUS_CHANGED,
    RADIO_PRESSED,
    TAX_SELECTED,
    TAX_RATE_SELECTED,
} from '../actions/types';

import { currentLocale } from '../../locales/i18n';
import type { DepoActionsTypes as Action } from '../actions/types';

const nextYear = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    return new Date(year + 1, month, day, 12);
};

const radioValue = (locale: string) => {
    if (locale === 'ru-RU') {
        return 2;
    }
    return 0;
};

type State = {
    +principal: string,
    +dateOpen: number,
    +dateClosed: number,
    +interest1: string,
    +interest2: string,
    +platez: number,
    +plusperiod: number,
    +prinplus: string,
    +radio: number,
    +taxCheck: number,
};

const INITIAL_STATE: State = {
    principal: (1000).toLocaleString('ru-RU'),
    dateOpen: new Date().valueOf(),
    dateClosed: nextYear(new Date()).valueOf(),
    interest1: '10',
    interest2: '0',
    platez: 0,
    plusperiod: 0,
    prinplus: '100',
    radio: radioValue(currentLocale),
    taxCheck: 0,
    taxRate: 0,
};

export default (state: State = INITIAL_STATE, action: Action): State => {
    // console.log(action.type);
    switch (action.type) {
        case PRINCIPAL_CHANGED:
            return { ...state, principal: action.payload };
        case DATE_OPEN_CHANGED:
            return { ...state, dateOpen: action.payload };
        case DATE_CLOSED_CHANGED:
            return { ...state, dateClosed: action.payload };
        case INTEREST1_CHANGED:
            return { ...state, interest1: action.payload };
        case INTEREST2_CHANGED:
            return { ...state, interest2: action.payload };
        case PLATEZ_CHANGED:
            return { ...state, platez: action.payload };
        case PLUSPERIOD_CHANGED:
            return { ...state, plusperiod: action.payload };
        case PRINPLUS_CHANGED:
            return { ...state, prinplus: action.payload };
        case RADIO_PRESSED:
            return { ...state, radio: action.payload };
        case TAX_SELECTED:
            return { ...state, taxCheck: action.payload };
        case TAX_RATE_SELECTED:
            return { ...state, taxRate: action.payload };
        default:
            return state;
    }
};
