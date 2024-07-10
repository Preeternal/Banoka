// @flow
import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import RNLanguages from 'react-native-languages';
// import Pie from 'react-native-pie';
import 'number-to-locale-string';

import {
    principalChanged,
    dateOpenChanged,
    dateClosedChanged,
    interest1Changed,
    interest2Changed,
    platezChanged,
    plusperiodChanged,
    prinplusChanged,
    radioPressed,
    taxSelected,
    taxRateSelected,
} from '../../actions';

import {
    Input,
    InputDate,
    InputPicker,
    CardSection,
    Card,
    Header,
    Result,
    ResultSrok,
    Table,
    TableSection,
} from '../../components/common';

import { LocalizationContext } from '../../Context';

import { initDate, number } from '../../lib';
import calculate from '../../lib/calculate';

import images from '../../assets/images';

type Props = {
    principal: string,
    dateOpen: number,
    dateClosed: number,
    interest1: string,
    interest2: string,
    platez: number,
    plusperiod: number,
    prinplus: string,
    radio: number,
    taxCheck: number,
    taxRate: number,
    language: number,
    country: number,
    principalChanged: Function,
    dateOpenChanged: Function,
    dateClosedChanged: Function,
    interest1Changed: Function,
    interest2Changed: Function,
    platezChanged: Function,
    plusperiodChanged: Function,
    prinplusChanged: Function,
    radioPressed: Function,
    taxSelected: Function,
    taxRateSelected: Function,

    calculated: typeof calculate,
};

const textColor = '#525050';
const activeTextColor = '#000000';

type State = {
    didFinishInitialAnimation?: boolean,
    principalColor?: string,
    interest1Color?: string,
    interest2Color?: string,
    prinplusColor?: string,
    isDatePickerVisible?: boolean,
    isDatePicker2Visible?: boolean,
    userCountryCode?: string,
};

class Depo extends Component<Props, State> {
    static contextType = LocalizationContext;

    state = {
        principalColor: textColor,
        interest1Color: textColor,
        interest2Color: textColor,
        prinplusColor: textColor,
        isDatePickerVisible: false,
        isDatePicker2Visible: false,
    };

    onFocus = (input: string, text: string) => {
        this.setState({
            [`${input}Color`]: activeTextColor,
        });
        if (text === '0' || text === '0,00') {
            this.props[`${input}Changed`]('');
        } else {
            this.props[`${input}Changed`](number(text));
        }
    };

    onBlur = (input: string, text: string) => {
        this.setState({
            [`${input}Color`]: textColor,
        });
        if (text === '') {
            this.props[`${input}Changed`]('0');
        } else {
            const minimumFractionDigits =
                Math.ceil(Number(text)) !== Number(text) ? 2 : 0;
            this.props[`${input}Changed`](
                Number(number(text)).toLocaleString('ru-RU', {
                    minimumFractionDigits,
                    maximumFractionDigits: minimumFractionDigits,
                }),
            );
        }
    };

    setDatePickerVisible = (value: boolean) => {
        this.setState({
            isDatePickerVisible: value,
        });
    };

    setDatePicker2Visible = (value: boolean) => {
        this.setState({
            isDatePicker2Visible: value,
        });
    };

    onPrincipalChange = (text: string) => {
        this.props.principalChanged(number(text));
    };

    onDateOpenChange = (date: Date) => {
        this.setDatePickerVisible(false);
        if (date) {
            this.props.dateOpenChanged(date.valueOf());
        }
    };

    onDateClosedChange = (date: Date) => {
        this.setDatePicker2Visible(false);
        if (date) {
            this.props.dateClosedChanged(date.valueOf());
        }
    };

    onInterest1Change = (text: string) => {
        this.props.interest1Changed(number(text));
    };

    onInterest2Change = (text: string) => {
        this.props.interest2Changed(number(text));
    };

    onPlatezChange = (value: number) => {
        this.props.platezChanged(value);
    };

    onPlusperiodChange = (value: number) => {
        this.props.plusperiodChanged(value);
    };

    onPrinplusChange = (text: string) => {
        this.props.prinplusChanged(number(text));
    };

    onRadioPress = (value: number) => {
        this.props.radioPressed(value);
    };

    onTaxSelect = (value: number) => {
        this.props.taxSelected(value);
    };

    onTaxRateSelect = (value: number) => {
        this.props.taxRateSelected(value);
    };

    render() {
        const {
            topImage,
            welcome,
            radioStyle,
            pieContainer,
            pie,
            gauge,
            gaugeText,
        } = styles;

        const {
            days1,
            srok,
            principal2,
            principal1,
            tax,
            adjunctionAll,
            table,
        } = this.props.calculated;

        const radio = [
            {
                label: '$usd ',
                index: 'USD',
                value: 0,
            },
            {
                label: '€eur ',
                index: 'EUR',
                value: 1,
            },
        ];

        const language = RNLanguages.language;

        if (language === 'ru-RU') {
            radio.push({
                label: '₽руб',
                index: 'RUB',
                value: 2,
            });
        }

        const currencyIndex =
            this.props.radio >= radio?.length ? 0 : this.props.radio;

        const optionsN = {
            style: 'currency',
            currencyDisplay: 'symbol',
            currency: radio[currencyIndex].index,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        const { t, locale } = this.context;

        const { isDatePickerVisible, isDatePicker2Visible } = this.state;
        const { dateOpen, dateClosed } = this.props;

        return (
            <ScrollView
                key={`${this.props.language}${this.props.country}`}
                style={{ flex: 1 }}>
                <Card>
                    {/* <Header headerText="Депозитный калькулятор" /> */}
                    <Header headerText={t('headerDeposit')} />
                    <CardSection>
                        <Image source={images.depo} style={topImage} />
                        <Text style={welcome}>
                            {/* 'Проверьте правильность ввода:' : 'Введите информацию о депозите: */}
                            {!srok ? t('welcome.error') : t('welcome.go')}
                        </Text>

                        <RadioForm
                            key={currencyIndex}
                            style={radioStyle}
                            // ref="radioForm"
                            radio_props={radio}
                            initial={currencyIndex}
                            formHorizontal
                            labelHorizontal
                            buttonColor="#757171"
                            selectedButtonColor="#525050"
                            // buttonInnerColor={'#e74c3c'}
                            // buttonOuterColor={'#757171'}
                            // buttonSize={15}
                            // buttonOuterSize={60}
                            labelColor="#757171"
                            selectedLabelColor="#525050"
                            animation
                            onPress={value => {
                                this.onRadioPress(value);
                            }}
                        />
                    </CardSection>

                    <TableSection>
                        <Input
                            // placeholder="введите сумму"
                            placeholder={t('input.principal.placeholder')}
                            // label="Сумма вклада"
                            label={`${t('input.principal.label')}, ${radio[
                                currencyIndex
                            ].label.charAt(0)}`}
                            onChangeText={this.onPrincipalChange}
                            onFocus={() =>
                                this.onFocus('principal', this.props.principal)
                            }
                            onBlur={() =>
                                this.onBlur('principal', this.props.principal)
                            }
                            appInputStyle={{ color: this.state.principalColor }}
                            value={this.props.principal}
                        />

                        <InputDate
                            // label="Дата открытия вклада"
                            label={t('input.dateOpen.label')}
                            value={initDate(new Date(dateOpen))}
                            onRootPress={() => this.setDatePickerVisible(true)}
                            onPress={() => this.setDatePickerVisible(true)}
                        />
                        <DateTimePicker
                            date={new Date(dateOpen)}
                            isVisible={isDatePickerVisible}
                            onConfirm={this.onDateOpenChange}
                            onCancel={() => this.setDatePickerVisible(false)}
                            display="spinner"
                        />
                        <InputDate
                            // label="Дата закрытия вклада"
                            label={t('input.dateClosed.label')}
                            value={initDate(new Date(dateClosed))}
                            onRootPress={() => this.setDatePicker2Visible(true)}
                            onPress={() => this.setDatePicker2Visible(true)}
                        />

                        <DateTimePicker
                            date={new Date(dateClosed)}
                            isVisible={isDatePicker2Visible}
                            onConfirm={this.onDateClosedChange}
                            onCancel={() => this.setDatePicker2Visible(false)}
                            display="spinner"
                        />

                        <Input
                            // placeholder="введите ставку"
                            placeholder={t('input.interest1.placeholder')}
                            // label="Процентная ставка"
                            label={t('input.interest1.label')}
                            onChangeText={this.onInterest1Change}
                            onBlur={() =>
                                this.onBlur('interest1', this.props.interest1)
                            }
                            onFocus={() =>
                                this.onFocus('interest1', this.props.interest1)
                            }
                            appInputStyle={{ color: this.state.interest1Color }}
                            value={this.props.interest1}
                        />

                        {days1 > 0 ? (
                            <Input
                                // placeholder="введите ставку"
                                placeholder={t('input.interest2.placeholder')}
                                // label="Процентная ставка при досрочном расторжении вклада (не полный месяц)"
                                label={t('input.interest2.label')}
                                onChangeText={this.onInterest2Change}
                                onBlur={() =>
                                    this.onBlur(
                                        'interest2',
                                        this.props.interest2,
                                    )
                                }
                                onFocus={() =>
                                    this.onFocus(
                                        'interest2',
                                        this.props.interest2,
                                    )
                                }
                                appInputStyle={{
                                    color: this.state.interest2Color,
                                }}
                                value={this.props.interest2}
                            />
                        ) : null}

                        <InputPicker
                            // label="Капитализация процентов (ежемесячно)"
                            label={t('input.platez.label')}
                            // options={['да', 'нет']}
                            options={[
                                t('input.platez.options.yes'),
                                t('input.platez.options.no'),
                            ]}
                            selectedValue={this.props.platez}
                            onValueChange={this.onPlatezChange}
                            borderRight
                        />

                        <InputPicker
                            // label="Пополнение депозита"
                            label={t('input.plusperiod.label')}
                            // options={['нет', 'ежемесячно', 'ежеквартально', 'ежегодно']}
                            options={[
                                t('input.plusperiod.options.no'),
                                t('input.plusperiod.options.monthly'),
                                t('input.plusperiod.options.quarterly'),
                                t('input.plusperiod.options.annually'),
                            ]}
                            selectedValue={this.props.plusperiod}
                            onValueChange={this.onPlusperiodChange}
                            borderRight
                        />

                        {Number(this.props.plusperiod) === 0 ? null : (
                            <Input
                                // label="На сумму"
                                label={`${t('input.prinplus.label')}, ${radio[
                                    currencyIndex
                                ].label.charAt(0)}`}
                                // placeholder="введите сумму"
                                placeholder={t('input.prinplus.placeholder')}
                                onChangeText={this.onPrinplusChange}
                                onBlur={() =>
                                    this.onBlur('prinplus', this.props.prinplus)
                                }
                                onFocus={() =>
                                    this.onFocus(
                                        'prinplus',
                                        this.props.prinplus,
                                    )
                                }
                                appInputStyle={{
                                    color: this.state.prinplusColor,
                                    height: 52,
                                }}
                                value={this.props.prinplus}
                            />
                        )}
                        {this.props.country !== 1 ? (
                            <InputPicker
                                // label="Налогооблажение вклада"
                                label={t('input.taxation')}
                                // options={['да', 'нет']}
                                options={[
                                    t('input.platez.options.yes'),
                                    t('input.platez.options.no'),
                                ]}
                                selectedValue={this.props.taxCheck}
                                onValueChange={this.onTaxSelect}
                                borderRight
                            />
                        ) : null}
                        {this.props.taxCheck === 0 &&
                            this.props.country === 0 && (
                                <InputPicker
                                    // label="Ставка налога"
                                    label={t('input.taxRate')}
                                    // options={['резидент РФ', 'нерезидент РФ']}
                                    options={[
                                        t('settings.resident'),
                                        t('settings.non-resident'),
                                    ]}
                                    selectedValue={this.props.taxRate}
                                    onValueChange={this.onTaxRateSelect}
                                    borderRight
                                />
                            )}
                    </TableSection>
                </Card>

                {srok && Number(number(this.props.principal)) !== 0 && (
                    <Card>
                        {/* <Header headerText="Информация о выплатах" /> */}
                        <Header headerText={t('result.header')} />

                        <ResultSrok
                            // label={`Срок депозита ${srok}`}
                            label={`${t('result.srok.srok')} ${srok}`}
                        />

                        <Result
                            // label="Сумма вклада
                            label={`${t('input.principal.label')}`}
                            // resultData={`${radio[currencyIndex].label.charAt(0)}${principal2.toFixed(
                            //   2
                            // )}`}
                            resultData={Number(
                                number(this.props.principal),
                            ).toLocaleString(locale, optionsN)}
                            resultPieStyle={{
                                borderLeftWidth: 5,
                                borderColor: '#ddd',
                            }}
                        />

                        {adjunctionAll > 0 ? (
                            <Result
                                // label="Сумма пополнений"
                                label={t('result.adjunctionAll')}
                                resultData={adjunctionAll.toLocaleString(
                                    locale,
                                    optionsN,
                                )}
                                resultPieStyle={{
                                    borderLeftWidth: 5,
                                    borderColor: '#a2aaa4',
                                }}
                            />
                        ) : null}

                        <Result
                            // label="Начисленные проценты"
                            label={t('result.principal2')}
                            // resultData={`${radio[currencyIndex].label.charAt(0)}${principal2.toFixed(
                            //   2
                            // )}`}
                            resultData={principal2.toLocaleString(
                                locale,
                                optionsN,
                            )}
                            resultPieStyle={{
                                borderLeftWidth: 5,
                                borderColor: '#569e69',
                            }}
                        />

                        {this.props.taxCheck === 0 &&
                            this.props.country !== 1 && (
                                <Result
                                    // label="Налоги"
                                    label={t('result.taxes')}
                                    resultData={tax.toLocaleString(
                                        locale,
                                        optionsN,
                                    )}
                                    resultPieStyle={{
                                        borderLeftWidth: 5,
                                        borderColor: '#db2323',
                                    }}
                                />
                            )}

                        {Number(number(this.props.principal)) !== 0 && (
                            <CardSection>
                                <View style={pieContainer}>
                                    <View
                                        style={{
                                            flex: 1.9,
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={{ fontFamily: 'Ubuntu' }}>
                                            {/* Сумма вклада с процентами */}
                                            {t('result.pie')}
                                        </Text>
                                    </View>
                                    <View style={pie}>
                                        {/* <Pie
                                            radius={65}
                                            innerRadius={59}
                                            sections={[
                                                {
                                                    percentage:
                                                        (Number(
                                                            number(
                                                                this.props
                                                                    .principal,
                                                            ),
                                                        ) *
                                                            100) /
                                                        (principal1 + tax),
                                                    color: '#ddd',
                                                },
                                                {
                                                    percentage:
                                                        (adjunctionAll * 100) /
                                                        (principal1 + tax),
                                                    color: '#a2aaa4',
                                                },
                                                {
                                                    percentage:
                                                        (principal2 * 100) /
                                                        (principal1 + tax),
                                                    color: '#569e69',
                                                },
                                                {
                                                    percentage:
                                                        (tax * 100) /
                                                        (principal1 + tax),
                                                    color: '#db2323',
                                                },
                                            ]}
                                            backgroundColor="#ddd"
                                        /> */}
                                        <View style={gauge}>
                                            <Text style={gaugeText}>
                                                {principal1.toLocaleString(
                                                    locale,
                                                    optionsN,
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </CardSection>
                        )}
                    </Card>
                )}

                {srok &&
                    Number(number(this.props.principal)) !== 0 &&
                    !!table && (
                        <Card>
                            {/* <Header headerText="Выписка со счёта" /> */}
                            <Header headerText={t('table.header')} />
                            <Table
                                currency={radio[currencyIndex].label}
                                value={table}
                                language={this.props.language}
                            />
                        </Card>
                    )}
            </ScrollView>
        );
    }
}

const styles = {
    welcome: {
        fontFamily: 'Ubuntu',
        fontSize: 17,
        margin: 10,
        textAlign: 'center',
    },
    topImage: {
        width: 270,
        height: 150,
        // flex: 1,
        alignSelf: 'center',
    },
    radioStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pieContainer: {
        paddingLeft: 10,
        paddingRight: 5,
        flex: 2,
        flexDirection: 'row',
    },
    pie: {
        flex: 1.1,
        paddingLeft: 10,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gauge: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        fontFamily: 'Ubuntu',
        backgroundColor: 'transparent',
    },
};

Depo.propTypes = {
    principal: PropTypes.string,
    dateOpen: PropTypes.number, // instanceOf(Date),
    dateClosed: PropTypes.number, // instanceOf(Date),
    interest1: PropTypes.string,
    interest2: PropTypes.string,
    platez: PropTypes.number,
    plusperiod: PropTypes.number,
    prinplus: PropTypes.string,
    radio: PropTypes.number,
    taxCheck: PropTypes.number,
    taxRate: PropTypes.number,
    language: PropTypes.number,
    country: PropTypes.number,
};

const mapStateToProps = state => ({
    principal: state.depo.principal,
    dateOpen: state.depo.dateOpen,
    dateClosed: state.depo.dateClosed,
    interest1: state.depo.interest1,
    interest2: state.depo.interest2,
    platez: state.depo.platez,
    plusperiod: state.depo.plusperiod,
    prinplus: state.depo.prinplus,
    radio: state.depo.radio,
    taxCheck: state.depo.taxCheck,
    taxRate: state.depo.taxRate,
    language: state.settings.language,
    country: state.settings.country,

    calculated: calculate(state),
});

const mapDispatchToActions = {
    principalChanged,
    dateOpenChanged,
    dateClosedChanged,
    interest1Changed,
    interest2Changed,
    platezChanged,
    plusperiodChanged,
    prinplusChanged,
    radioPressed,
    taxSelected,
    taxRateSelected,
};
export default connect<any, any, any, any, any, any>(
    mapStateToProps,
    mapDispatchToActions,
)(Depo);
