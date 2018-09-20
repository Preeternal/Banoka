//@flow
import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED,
  DATE_CLOSED_CHANGED,
  INTEREST1_CHANGED,
  INTEREST2_CHANGED,
  PLATEZ_CHANGED,
  PLUSPERIOD_CHANGED,
  PRINPLUS_CHANGED,
  RADIO_PRESSED
} from '../actions/types';

import type { FormActionsTypes } from '../actions/types';

import { initDate } from '../lib';

import { currentLocale } from '../../locales/i18n';
import 'number-to-locale-string';

const nextYear = (d: Date) => {
  //const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  return new Date(year + 1, month, day);
};

const radioValue = (currentLocale: string) => {
  if (currentLocale === 'ru-RU') {
    return 2;
  } else {
    return 0;
  }
};

type FormState = {
  principal: string | null,
  dateOpen: string,
  dateClosed: string,
  interest1: string,
  interest2: string,
  platez: number,
  plusperiod: number,
  prinplus: string,
  radio: number
};

const INITIAL_STATE: FormState = {
  principal: (1000).toLocaleString('ru-RU'),
  dateOpen: initDate(new Date()),
  dateClosed: initDate(nextYear(new Date())),
  interest1: '10',
  interest2: '0',
  platez: 0,
  plusperiod: 0,
  prinplus: '100',
  radio: radioValue(currentLocale)
};

export default (state: FormState = INITIAL_STATE, action: FormActionsTypes): FormState => {
  //console.log(action.type);
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
    default:
      return state;
  }
};