// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
// import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/Ionicons';
import RNLanguages from 'react-native-languages';
import 'number-to-locale-string';

import {
    creditPrincipalChanged,
    creditInterestChanged,
    creditDateOpenChanged,
    creditSrokValueChanged,
    creditSrokOptionSelected,
    creditPlatezSelected,
    creditEdinComValueChanged,
    creditEdinComOptionSelected,
    creditStartCostComChanged,
    creditFinCostComChanged,
    creditAcCountComChanged,
    radioPressed,
} from '../../actions';

import {
    Input,
    InputTextPicker,
    InputPicker,
    InputDate,
    CardSection,
    Card,
    Header,
    Result,
    ResultSrok,
    CreditTable,
    TableSection,
} from '../../components/common';

import { LocalizationContext } from '../../Context';

import { initDate, number } from '../../lib';
import creditCalculate from '../../lib/creditCalculate';

import images from '../../assets/images';

type Props = {
    creditPrincipal: string,
    creditInterest: string,
    creditDateOpen: number,
    creditSrok: string,
    creditSrokOption: number,
    creditPlatez: number,
    creditEdinCom: string,
    creditEdinComOption: number,
    creditStartCostCom: string,
    creditFinCostCom: string,
    creditAcCountCom: string,
    radio: number,
    language: number,
    creditPrincipalChanged: typeof creditPrincipalChanged,
    creditInterestChanged: typeof creditInterestChanged,
    creditDateOpenChanged: typeof creditDateOpenChanged,
    creditSrokValueChanged: typeof creditSrokValueChanged,
    creditSrokOptionSelected: typeof creditSrokOptionSelected,
    creditPlatezSelected: typeof creditPlatezSelected,
    creditEdinComValueChanged: typeof creditEdinComValueChanged,
    creditEdinComOptionSelected: typeof creditEdinComOptionSelected,
    creditStartCostComChanged: typeof creditStartCostComChanged,
    creditFinCostComChanged: typeof creditFinCostComChanged,
    creditAcCountComChanged: typeof creditAcCountComChanged,
    radioPressed: typeof radioPressed,

    calculated: typeof creditCalculate,
};

type State = {
    didFinishInitialAnimation?: boolean,
    creditPrincipalColor?: string,
    creditInterestColor?: string,
    creditSrokValueColor?: string,
    creditEdinComColor?: string,
    creditStartCostComColor?: string,
    creditFinCostComColor?: string,
    creditAcCountComColor?: string,
    isDatePickerVisible?: boolean,
    detailsHeaderMargin?: number,
    width?: number,
    pickerWidth?: number,
    commission?: boolean,
};

const textColor = '#525050';
const activeTextColor = '#000000';

class Credit extends Component<Props, State> {
    static contextType = LocalizationContext;

    state = {
        creditPrincipalColor: textColor,
        creditInterestColor: textColor,
        creditSrokValueColor: textColor,
        creditEdinComColor: textColor,
        creditStartCostComColor: textColor,
        creditFinCostComColor: textColor,
        creditAcCountComColor: textColor,
        isDatePickerVisible: false,
        detailsHeaderMargin: 0,
        width: 1.5 * Dimensions.get('window').width,
        pickerWidth: Dimensions.get('window').width / 2.9,
        commission: !!this.props.calculated.comPayments,
    };

    scrollView: {| current: null | any |} = React.createRef();

    componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', this.getOrientation);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.getOrientation);
    }

    getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({
                width: 1.5 * Dimensions.get('window').width,
                pickerWidth: Dimensions.get('window').width / 2.9,
            });
        } else {
            this.setState({
                width: Dimensions.get('window').width - 10,
                pickerWidth: Dimensions.get('window').width / 2.9,
                detailsHeaderMargin: 0,
            });
        }
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
                Number(text).toLocaleString('ru-RU', {
                    minimumFractionDigits,
                    maximumFractionDigits: minimumFractionDigits,
                }),
            );
        }
    };

    onFocusTextPicker = (input: string, text: string) => {
        this.setState({
            [`${input}Color`]: activeTextColor,
        });
        if (text === '0') {
            this.props[`${input}Changed`]('');
        }
    };

    onBlurTextPicker = (input: string, text: string) => {
        this.setState({
            [`${input}Color`]: textColor,
        });
        if (text === '') {
            this.props[`${input}Changed`]('0');
        }
    };

    setDatePickerVisible = (value: boolean) => {
        this.setState({
            isDatePickerVisible: value,
        });
    };

    onCreditPrincipalChange = (text: string) => {
        this.props.creditPrincipalChanged(number(text));
    };

    onCreditInterestChange = (text: string) => {
        this.props.creditInterestChanged(number(text));
    };

    onCreditDateOpenChange = (date: Date) => {
        this.setDatePickerVisible(false);
        if (date) {
            this.props.creditDateOpenChanged(date.valueOf());
        }
    };

    onCreditSrokValueChange = (text: string) => {
        this.props.creditSrokValueChanged(
            Math.ceil(Number(number(text))).toString(),
        );
    };

    onCreditSrokOptionSelect = (option: number) => {
        this.props.creditSrokOptionSelected(option);
    };

    onCreditPlatezSelect = (option: number) => {
        this.props.creditPlatezSelected(option);
    };

    onCreditEdinComValueChange = (text: string) => {
        this.props.creditEdinComValueChanged(number(text));
    };

    onCreditEdinComOptionSelect = (option: number) => {
        this.props.creditEdinComOptionSelected(option);
    };

    onCreditStartCostComChange = (text: string) => {
        this.checkComValue(text);
        this.props.creditStartCostComChanged(number(text));
    };

    onCreditFinCostComChange = (text: string) => {
        this.checkComValue(text);
        this.props.creditFinCostComChanged(number(text));
    };

    onCreditAcCountComChange = (text: string) => {
        this.props.creditAcCountComChanged(number(text));
    };

    checkComValue = (value: string) => {
        const { t } = this.context;
        if (Number(value) > 1) {
            Alert.alert(
                'Banoka',
                t('credit.input.alertCom'),
                [{ text: 'OK' }],
                {
                    cancelable: false,
                },
            );
        }
    };

    onRadioPress = (value: number) => {
        this.props.radioPressed(value);
    };

    onCommissionTouch = () => {
        this.setState(prevState => ({
            commission: !prevState.commission,
        }));
    };

    scrollToIndex = () => {
        if (this.scrollView.current) {
            if (this.state.detailsHeaderMargin === 0) {
                this.scrollView.current.scrollToEnd({ animated: true });
            } else {
                this.scrollView.current.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                });
            }
        }
    };

    handleScroll = (event: Object) => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            if (
                event.nativeEvent.layoutMeasurement.width +
                    event.nativeEvent.contentOffset.x +
                    0.0001 >=
                event.nativeEvent.contentSize.width
            ) {
                this.setState({
                    detailsHeaderMargin:
                        1.5 * event.nativeEvent.layoutMeasurement.width -
                        event.nativeEvent.layoutMeasurement.width,
                });
            } else if (event.nativeEvent.contentOffset.x === 0) {
                this.setState({
                    detailsHeaderMargin: 0,
                });
            }
        }
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
            creditDateClosed,
            monthlyAll, // Ваш ежемесячный платёж
            vsego, // итого к оплате
            pereplata, // Сумма переплаты
            comPayments, // комиссионные платежи
            interestPayments, // на оплату процентов
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
        const { creditDateOpen } = this.props;
        const { isDatePickerVisible } = this.state;

        return (
            <ScrollView key={this.props.language} style={{ flex: 1 }}>
                <Card>
                    {/* <Header headerText="Депозитный калькулятор" /> */}
                    <Header headerText={t('headerCredit')} />
                    <CardSection>
                        <Image source={images.credit} style={topImage} />
                        <Text style={welcome}>
                            {/* 'Проверьте правильность ввода:' : 'Введите информацию о депозите: */}
                            {!Number(this.props.creditSrok)
                                ? t('welcome.error')
                                : t('credit.go')}
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
                            // label="Сумма кредита"
                            label={`${t(
                                'credit.input.principal.label',
                            )}, ${radio[currencyIndex].label.charAt(0)}`}
                            onChangeText={this.onCreditPrincipalChange}
                            onFocus={() =>
                                this.onFocus(
                                    'creditPrincipal',
                                    this.props.creditPrincipal,
                                )
                            }
                            onBlur={() =>
                                this.onBlur(
                                    'creditPrincipal',
                                    this.props.creditPrincipal,
                                )
                            }
                            appInputStyle={{
                                color: this.state.creditPrincipalColor,
                            }}
                            value={this.props.creditPrincipal}
                        />

                        <Input
                            // placeholder="годовая процентная ставка"
                            placeholder={t('input.interest1.placeholder')}
                            // label="Процентная ставка"
                            label={t('credit.input.interest.label')}
                            onChangeText={this.onCreditInterestChange}
                            onBlur={() =>
                                this.onBlur(
                                    'creditInterest',
                                    this.props.creditInterest,
                                )
                            }
                            onFocus={() =>
                                this.onFocus(
                                    'creditInterest',
                                    this.props.creditInterest,
                                )
                            }
                            appInputStyle={{
                                color: this.state.creditInterestColor,
                            }}
                            value={this.props.creditInterest}
                        />

                        <InputDate
                            // label="Дата выдачи кредита"
                            label={t('credit.input.dateOpen.label')}
                            value={initDate(new Date(creditDateOpen))}
                            onRootPress={() => this.setDatePickerVisible(true)}
                            onPress={() => this.setDatePickerVisible(true)}
                        />
                        <DateTimePicker
                            date={new Date(creditDateOpen)}
                            isVisible={isDatePickerVisible}
                            onConfirm={this.onCreditDateOpenChange}
                            onCancel={() => this.setDatePickerVisible(false)}
                            display="spinner"
                        />

                        <InputTextPicker
                            // placeholder="Срок кредита"
                            placeholder={t('credit.input.srok.placeholder')}
                            // label="Процентная ставка"
                            label={t('credit.input.srok.label')}
                            onChangeText={this.onCreditSrokValueChange}
                            onBlur={() =>
                                this.onBlurTextPicker(
                                    'creditSrokValue',
                                    this.props.creditSrok,
                                )
                            }
                            onFocus={() =>
                                this.onFocusTextPicker(
                                    'creditSrokValue',
                                    this.props.creditSrok,
                                )
                            }
                            appInputStyle={{
                                color: this.state.creditSrokValueColor,
                            }}
                            value={this.props.creditSrok}
                            // options={['месяцы', 'годы']}
                            options={[
                                t('credit.input.srok.options.months'),
                                t('credit.input.srok.options.years'),
                            ]}
                            selectedValue={this.props.creditSrokOption}
                            onValueChange={this.onCreditSrokOptionSelect}
                        />

                        <InputPicker
                            // label="Вид платежей"
                            label={t('credit.input.platez.label')}
                            // options={['Аннуитет', 'Единовременно', 'Дифференцировано']}
                            options={[
                                t('credit.input.platez.options.annuity'),
                                t('credit.input.platez.options.lump'),
                                t('credit.input.platez.options.differentiated'),
                            ]}
                            pickerWidth={this.state.pickerWidth}
                            selectedValue={this.props.creditPlatez}
                            onValueChange={this.onCreditPlatezSelect}
                            borderRight
                        />

                        <CardSection
                            addStyle={{
                                backgroundColor: '#f1f1f1',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                                onPress={this.onCommissionTouch}>
                                <Text style={{ fontFamily: 'Ubuntu' }}>
                                    {`${t('credit.result.comPayments')}  `}
                                </Text>
                                <Icon
                                    name={
                                        !this.state.commission
                                            ? 'caret-down-sharp'
                                            : 'caret-up-sharp'
                                    }
                                    style={{
                                        fontSize: 12,
                                        color: '#525050',
                                        marginTop: Platform.select({
                                            android: 3,
                                            ios: 1,
                                        }),
                                    }}
                                />
                            </TouchableOpacity>
                        </CardSection>

                        {this.state.commission && (
                            <InputTextPicker
                                // placeholder="Единоразовая комиссия"
                                placeholder={
                                    !this.props.creditEdinComOption
                                        ? t(
                                              'credit.input.startCostCom.placeholder',
                                          )
                                        : t('input.principal.placeholder')
                                }
                                label={t('credit.input.edinСom.label')}
                                labelTextStyle={{ flex: 2.5 }}
                                onChangeText={this.onCreditEdinComValueChange}
                                onBlur={() =>
                                    this.onBlur(
                                        'creditEdinComValue',
                                        this.props.creditEdinCom,
                                    )
                                }
                                onFocus={() =>
                                    this.onFocus(
                                        'creditEdinComValue',
                                        this.props.creditEdinCom,
                                    )
                                }
                                appInputStyle={{
                                    color: this.state.creditEdinComColor,
                                }}
                                value={this.props.creditEdinCom}
                                // options={['%', '₽руб']}
                                options={[
                                    '%',
                                    radio[currencyIndex].label.charAt(0),
                                ]}
                                selectedValue={this.props.creditEdinComOption}
                                onValueChange={this.onCreditEdinComOptionSelect}
                            />
                        )}
                        {this.props.creditPlatez !== 1 &&
                            this.state.commission && (
                                <View>
                                    <Input
                                        placeholder={t(
                                            'credit.input.startCostCom.placeholder',
                                        )}
                                        // label="Ежемесячная комиссия на нач. стоимость"
                                        label={t(
                                            'credit.input.startCostCom.label',
                                        )}
                                        onChangeText={
                                            this.onCreditStartCostComChange
                                        }
                                        onFocus={() =>
                                            this.onFocus(
                                                'creditStartCostCom',
                                                this.props.creditStartCostCom,
                                            )
                                        }
                                        onBlur={() =>
                                            this.onBlur(
                                                'creditStartCostCom',
                                                this.props.creditStartCostCom,
                                            )
                                        }
                                        appInputStyle={{
                                            color: this.state
                                                .creditStartCostComColor,
                                        }}
                                        value={this.props.creditStartCostCom}
                                    />

                                    <Input
                                        placeholder={t(
                                            'credit.input.startCostCom.placeholder',
                                        )}
                                        // label="Ежемесячная комиссия на остаток долга"
                                        label={t(
                                            'credit.input.finCostCom.label',
                                        )}
                                        onChangeText={
                                            this.onCreditFinCostComChange
                                        }
                                        onFocus={() =>
                                            this.onFocus(
                                                'creditFinCostCom',
                                                this.props.creditFinCostCom,
                                            )
                                        }
                                        onBlur={() =>
                                            this.onBlur(
                                                'creditFinCostCom',
                                                this.props.creditFinCostCom,
                                            )
                                        }
                                        appInputStyle={{
                                            color: this.state
                                                .creditFinCostComColor,
                                        }}
                                        value={this.props.creditFinCostCom}
                                    />

                                    <Input
                                        placeholder={t(
                                            'input.principal.placeholder',
                                        )}
                                        // label="Ежемесячная комиссия за ведение счёта"
                                        label={`${t(
                                            'credit.input.acCountCom.label',
                                        )} ${radio[currencyIndex].label.charAt(
                                            0,
                                        )}`}
                                        onChangeText={
                                            this.onCreditAcCountComChange
                                        }
                                        onFocus={() =>
                                            this.onFocus(
                                                'creditAcCountCom',
                                                this.props.creditAcCountCom,
                                            )
                                        }
                                        onBlur={() =>
                                            this.onBlur(
                                                'creditAcCountCom',
                                                this.props.creditAcCountCom,
                                            )
                                        }
                                        appInputStyle={{
                                            color: this.state
                                                .creditAcCountComColor,
                                        }}
                                        value={this.props.creditAcCountCom}
                                    />
                                </View>
                            )}
                    </TableSection>
                </Card>

                {Number(this.props.creditSrok) > 0 &&
                    !!creditDateClosed &&
                    Number(number(this.props.creditPrincipal)) !== 0 && (
                        <Card>
                            {/* Информация о платежах */}
                            <Header headerText={t('credit.result.header')} />

                            <ResultSrok
                                // дата погашения кредита
                                label={`${t(
                                    'credit.result.dateClosed',
                                )} ${initDate(creditDateClosed)}`}
                            />
                            {this.props.creditPlatez !== 1 && (
                                <Result
                                    // Ваш ежемесячный платёж
                                    label={
                                        this.props.creditPlatez === 2
                                            ? t('credit.result.monthlyAll_2')
                                            : t('credit.result.monthlyAll_0')
                                    }
                                    resultData={monthlyAll.toLocaleString(
                                        locale,
                                        optionsN,
                                    )}
                                    resultPieStyle={{
                                        borderLeftWidth: 5,
                                        borderColor: '#ddd',
                                    }}
                                />
                            )}

                            <Result
                                // На оплату процентов
                                label={t('credit.result.interestPayments')}
                                resultData={Number(
                                    interestPayments,
                                ).toLocaleString(locale, optionsN)}
                                resultPieStyle={{
                                    borderLeftWidth: 5,
                                    borderColor: '#a2aaa4',
                                }}
                            />

                            {comPayments > 0 && (
                                <View>
                                    <Result
                                        // Комиссионные платежи
                                        label={t('credit.result.comPayments')}
                                        resultData={comPayments.toLocaleString(
                                            locale,
                                            optionsN,
                                        )}
                                        resultPieStyle={{
                                            borderLeftWidth: 5,
                                            borderColor: '#569e69',
                                        }}
                                    />
                                    <Result
                                        // Сумма переплаты
                                        label={t('credit.result.pereplata')}
                                        resultData={pereplata.toLocaleString(
                                            locale,
                                            optionsN,
                                        )}
                                        labelPieStyle={{
                                            borderRightWidth: 2.7,
                                            borderColor: '#a2aaa4',
                                        }}
                                        resultPieStyle={{
                                            borderLeftWidth: 2.3,
                                            borderColor: '#569e69',
                                        }}
                                    />
                                </View>
                            )}

                            {Number(number(this.props.creditPrincipal)) !==
                                0 && (
                                <CardSection>
                                    <View style={pieContainer}>
                                        <View
                                            style={{
                                                flex: 1.9,
                                                justifyContent: 'center',
                                            }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Ubuntu',
                                                }}>
                                                {/* итого к оплате */}
                                                {t('credit.result.vsego')}
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
                                                                        .creditPrincipal,
                                                                ),
                                                            ) *
                                                                100) /
                                                            vsego,
                                                        color: '#ddd',
                                                    },
                                                    {
                                                        percentage:
                                                            (interestPayments *
                                                                100) /
                                                            vsego,
                                                        color: '#a2aaa4',
                                                    },
                                                    {
                                                        percentage:
                                                            (comPayments *
                                                                100) /
                                                            vsego,
                                                        color: '#569e69',
                                                    },
                                                ]}
                                                backgroundColor="#ddd"
                                            /> */}
                                            <View style={gauge}>
                                                <Text style={gaugeText}>
                                                    {vsego.toLocaleString(
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

                {Number(this.props.creditSrok) > 0 &&
                    Number(number(this.props.creditPrincipal)) !== 0 &&
                    this.props.creditPlatez !== 1 && (
                        <ScrollView
                            horizontal
                            onScroll={this.handleScroll}
                            scrollEventThrottle={16}
                            ref={this.scrollView}>
                            <Card>
                                <TouchableOpacity onPress={this.scrollToIndex}>
                                    {/* <Header headerText="Выписка со счёта" /> */}
                                    <Header
                                        headerText={
                                            Dimensions.get('window').width <
                                            Dimensions.get('window').height
                                                ? this.state
                                                      .detailsHeaderMargin === 0
                                                    ? `${t(
                                                          'credit.table.header',
                                                      )} >>`
                                                    : `<< ${t(
                                                          'credit.table.header',
                                                      )}`
                                                : t('credit.table.header')
                                        }
                                        innerStyle={{
                                            width:
                                                Dimensions.get('window').width -
                                                10,
                                            marginLeft:
                                                this.state.detailsHeaderMargin,
                                        }}
                                    />
                                </TouchableOpacity>
                                <CreditTable
                                    currency={radio[currencyIndex].label}
                                    value={table}
                                    language={this.props.language}
                                    width={this.state.width}
                                />
                            </Card>
                        </ScrollView>
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
        height: 170,
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

Credit.propTypes = {
    creditPrincipal: PropTypes.string,
    creditInterest: PropTypes.string,
    creditDateOpen: PropTypes.number, // instanceOf(Date),
    creditSrok: PropTypes.string,
    creditSrokOption: PropTypes.number,
    creditPlatez: PropTypes.number,
    creditEdinCom: PropTypes.string,
    creditEdinComOption: PropTypes.number,
    creditStartCostCom: PropTypes.string,
    creditFinCostCom: PropTypes.string,
    creditAcCountCom: PropTypes.string,
    radio: PropTypes.number,
    language: PropTypes.number,
};

const mapStateToProps = state => ({
    creditPrincipal: state.credit.creditPrincipal,
    creditInterest: state.credit.creditInterest,
    creditDateOpen: state.credit.creditDateOpen,
    creditSrok: state.credit.creditSrok,
    creditSrokOption: state.credit.creditSrokOption,
    creditPlatez: state.credit.creditPlatez,
    creditEdinCom: state.credit.creditEdinCom,
    creditEdinComOption: state.credit.creditEdinComOption,
    creditStartCostCom: state.credit.creditStartCostCom,
    creditFinCostCom: state.credit.creditFinCostCom,
    creditAcCountCom: state.credit.creditAcCountCom,
    radio: state.depo.radio,
    language: state.settings.language,

    calculated: creditCalculate(state),
});

const mapDispatchToActions = {
    creditPrincipalChanged,
    creditInterestChanged,
    creditDateOpenChanged,
    creditSrokValueChanged,
    creditSrokOptionSelected,
    creditPlatezSelected,
    creditEdinComValueChanged,
    creditEdinComOptionSelected,
    creditStartCostComChanged,
    creditFinCostComChanged,
    creditAcCountComChanged,
    radioPressed,
};

export default connect<any, any, any, any, any, any>(
    mapStateToProps,
    mapDispatchToActions,
)(Credit);
