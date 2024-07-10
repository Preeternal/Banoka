// @flow

// Depo
export const PRINCIPAL_CHANGED = 'principal_changed';
export const DATE_OPEN_CHANGED = 'date_open_changed';
export const DATE_CLOSED_CHANGED = 'date_closed_changed';
export const INTEREST1_CHANGED = 'interest1_changed';
export const INTEREST2_CHANGED = 'interest2_changed';
export const PLATEZ_CHANGED = 'platez_changed';
export const PLUSPERIOD_CHANGED = 'plusperiod_changed';
export const PRINPLUS_CHANGED = 'prinplus_changed';
export const RADIO_PRESSED = 'radio_pressed'; // common action
export const TAX_SELECTED = 'tax_selected';
export const TAX_RATE_SELECTED = 'tax_rate_selected';

export type DepoActionsTypes =
    | { type: 'principal_changed', payload: string }
    | { type: 'date_open_changed', payload: number }
    | { type: 'date_closed_changed', payload: number }
    | { type: 'interest1_changed', payload: string }
    | { type: 'interest2_changed', payload: string }
    | { type: 'platez_changed', payload: number }
    | { type: 'plusperiod_changed', payload: number }
    | { type: 'prinplus_changed', payload: string }
    | { type: 'radio_pressed', payload: number }
    | { type: 'tax_selected', payload: number }
    | { type: 'tax_rate_selected', payload: number };

// Credit
export const CREDIT_PRINCIPAL_CHANGED = 'credit_principal_changed';
export const CREDIT_INTEREST_CHANGED = 'credit_interest_changed';
export const CREDIT_DATE_OPEN_CHANGED = 'credit_date_open_changed';
export const CREDIT_SROK_VALUE_CHANGED = 'credit_srok_value_changed';
export const CREDIT_SROK_OPTION_SELECTED = 'credit_srok_option_selected';
export const CREDIT_PLATEZ_SELECTED = 'credit_platez_selected';
export const CREDIT_EDIN_COM_VALUE_CHANGED = 'credit_edin_com_value_changed';
export const CREDIT_EDIN_COM_OPTION_SELECTED =
    'credit_edin_com_option_selected';
export const CREDIT_START_COST_COM_CHANGED = 'credit_start_cost_com_changed';
export const CREDIT_FIN_COST_COM_CHANGED = 'credit_fin_cost_com_changed';
export const CREDIT_AC_COUNT_COM_CHANGED = 'credit_ac_count_com_changed';

export type CreditActionsTypes =
    | { type: 'credit_principal_changed', payload: string }
    | { type: 'credit_interest_changed', payload: string }
    | { type: 'credit_date_open_changed', payload: number }
    | { type: 'credit_srok_value_changed', payload: string }
    | { type: 'credit_srok_option_selected', payload: number }
    | { type: 'credit_platez_selected', payload: number }
    | { type: 'credit_edin_com_value_changed', payload: string }
    | { type: 'credit_edin_com_option_selected', payload: number }
    | { type: 'credit_start_cost_com_changed', payload: string }
    | { type: 'credit_fin_cost_com_changed', payload: string }
    | { type: 'credit_ac_count_com_changed', payload: string };

// Converter
export const PRESET_CHANGED = 'preset_changed';
export const CURRENCIES_CHANGED = 'currencies_changed';
export const PRESET_CURRENCIES_CHANGED = 'preset_currencies_changed';

export type ConverterActionsTypes =
    | { type: 'preset_changed', payload: Array<string> }
    | { type: 'currencies_changed', payload: Array<Object> }
    | { type: 'preset_currencies_changed', payload: Array<Object> };

// Settings
export const LANGUAGE_CHANGED = 'language_changed';
export const COUNTRY_CHANGED = 'country_changed';
export const COUNTRY_IP_TRIGGERED = 'country_ip_triggered';
export const SCREEN_ORIENTATION_CHANGED = 'screen_orientation_changed';

export type SettingsActionsTypes =
    | { type: 'language_changed', payload: number }
    | { type: 'country_changed', payload: number }
    | { type: 'country_ip_triggered', payload: boolean }
    | { type: 'screen_orientation_changed', payload: boolean };

export type Action =
    | DepoActionsTypes
    | CreditActionsTypes
    | ConverterActionsTypes
    | SettingsActionsTypes;
