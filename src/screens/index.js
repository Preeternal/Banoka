// @flow
import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import cron from 'node-cron';
import { DateTime } from 'luxon';
import SplashScreen from 'react-native-splash-screen';
import 'number-to-locale-string';

import Depo from './Depo';
import Credit from './Credit';
import Converter from './Converter';
import AddCurrency from './Converter/AddCurrency';
import EditPreset from './Converter/EditPreset';
import Settings from './Settings';
import Investments from './Settings/Investments';
import Help from './Help';
import { DrawerButton, DrawerScreen } from './Common';
import {
    languageChanged,
    countryChanged,
    countryIpTriggered,
} from '../actions';
import storeCurrencies from '../lib/storeCurrencies';
import { store } from '../store';
import { LocalizationContext } from '../Context';
import { currentLocale } from '../../locales/i18n';

enableScreens();
const styles = {
    headerStyle: {
        backgroundColor: '#525050',
        height: Platform.OS === 'ios' ? 115 : 100,
    },
    headerTitleStyle: {
        fontFamily: 'Ubuntu',
        color: '#ffffff',
        fontSize: 18,
        textAlignVertical: 'center',
    },
    headerTintColor: '#fff',
    headerLeftContainerStyle: {
        marginLeft: 20,
    },
    headerRightContainerStyle: {
        marginRight: 20,
    },
};
const Stack = createStackNavigator();

const selectOrientation = state => state.settings.isLandscape;
const isLandscape = selectOrientation(store.getState());

const DepoStack = ({ navigation }) => {
    const {
        headerStyle,
        headerTitleStyle,
        headerTintColor,
        headerLeftContainerStyle,
    } = styles;
    const { t, locale } = React.useContext(LocalizationContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                key={locale + isLandscape}
                name="Depo"
                component={Depo}
                options={() => ({
                    title: t('titleDeposit'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerLeftContainerStyle,
                    headerStatusBarHeight: 23,
                    headerLeft: () => (
                        <DrawerButton onPress={navigation.openDrawer} />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

const CreditStack = ({ navigation }) => {
    const {
        headerStyle,
        headerTitleStyle,
        headerTintColor,
        headerLeftContainerStyle,
    } = styles;
    const { t, locale } = React.useContext(LocalizationContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                key={locale + isLandscape}
                name="Credit"
                component={Credit}
                options={() => ({
                    title: t('titleCredit'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerLeftContainerStyle,
                    // headerStatusBarHeight: 23,
                    headerLeft: () => (
                        <DrawerButton onPress={navigation.openDrawer} />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

const ConverterStack = ({ navigation }) => {
    const {
        headerStyle,
        headerTitleStyle,
        headerTintColor,
        headerLeftContainerStyle,
        headerRightContainerStyle,
    } = styles;
    const { t, locale } = React.useContext(LocalizationContext);
    return (
        <Stack.Navigator initialRouteName="Converter">
            <Stack.Screen
                key={locale + isLandscape}
                name="Converter"
                component={Converter}
                options={{
                    title: t('converter.title'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerLeftContainerStyle,
                    headerRightContainerStyle,
                    headerStatusBarHeight: 23,
                    headerLeft: () => (
                        <DrawerButton onPress={navigation.openDrawer} />
                    ),
                    headerRight: () => (
                        <DrawerButton
                            name="create"
                            onPress={() => navigation.navigate('EditPreset')}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="AddCurrency"
                component={AddCurrency}
                options={options => ({
                    title: t('converter.addCurrency'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerLeftContainerStyle,
                    headerStatusBarHeight: 23,
                    headerLeft: () => (
                        <DrawerButton
                            name="md-close"
                            onPress={options.navigation.goBack}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="EditPreset"
                component={EditPreset}
                options={{
                    title: t('converter.changeCurr'),
                    headerBackTitle: null,
                    headerBackTitleVisible: false,
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerStatusBarHeight: 23,
                }}
            />
        </Stack.Navigator>
    );
};

const SettingsStack = ({ navigation }) => {
    const {
        headerStyle,
        headerTitleStyle,
        headerTintColor,
        headerLeftContainerStyle,
        headerRightContainerStyle,
    } = styles;
    const { t, locale } = React.useContext(LocalizationContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                key={locale + isLandscape}
                name="Settings"
                component={Settings}
                options={() => ({
                    title: t('settings.settings'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerLeftContainerStyle,
                    headerRightContainerStyle,
                    headerStatusBarHeight: 23,
                    headerLeft: () => (
                        <DrawerButton onPress={navigation.openDrawer} />
                    ),
                    headerRight: () =>
                        Platform.OS === 'android' && (
                            <DrawerButton
                                type="MaterialIcons"
                                name="payment"
                                onPress={() =>
                                    navigation.navigate('Investments')
                                }
                            />
                        ),
                })}
            />
            <Stack.Screen
                name="Investments"
                component={Investments}
                options={() => ({
                    title: t('settings.donat.investments'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    // headerLeftContainerStyle,
                    headerStatusBarHeight: 23,
                    // headerLeft: () => <DrawerButton onPress={navigation.openDrawer} />,
                })}
            />
        </Stack.Navigator>
    );
};

const HelpStack = ({ navigation }) => {
    const {
        headerStyle,
        headerTitleStyle,
        headerTintColor,
        headerLeftContainerStyle,
    } = styles;
    const { t, locale } = React.useContext(LocalizationContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                key={locale + isLandscape}
                name="Help"
                component={Help}
                options={() => ({
                    title: t('help.header'),
                    headerStyle,
                    headerTitleStyle,
                    headerTintColor,
                    headerLeftContainerStyle,
                    headerStatusBarHeight: 23,
                    headerLeft: () => (
                        <DrawerButton onPress={navigation.openDrawer} />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

const Drawer = createDrawerNavigator();

const iconStyle = (focused, color, size) => ({
    textAlign: 'center',
    width: 30,
    fontSize: size,
    color: focused ? color : '#757171',
});

const Navigator = () => {
    const { t } = React.useContext(LocalizationContext);
    return (
        <>
            <StatusBar
                animated
                translucent
                backgroundColor="rgba(0, 0, 0, 0)"
            />
            <Drawer.Navigator
                initialRouteName="ConverterStack"
                screenOptions={{
                    headerShown: false,
                    activeTintColor: '#000000',
                    inactiveTintColor: '#525050',
                    labelStyle: {
                        fontFamily: 'Ubuntu',
                        fontWeight: '700',
                        // fontSize: 12,
                    },
                    // itemStyle: {
                    //     // alignSelf: 'flex-end', justifyContent: 'flex-end'
                    //     // flex: 1,
                    // },
                }}
                drawerContent={props => <DrawerScreen {...props} />}
                // drawerContentOptions={{
                //     activeTintColor: '#000000',
                //     inactiveTintColor: '#525050',
                //     labelStyle: {
                //         fontFamily: 'Ubuntu',
                //         fontWeight: '700',
                //         // fontSize: 12,
                //     },
                //     itemStyle: {
                //         // alignSelf: 'flex-end', justifyContent: 'flex-end'
                //         // flex: 1,
                //     },
                // }}
                drawerStyle={{
                    // backgroundColor: '#c6cbef',
                    width: 304,
                }}>
                {/* <Drawer.Screen
                    name="ConverterStack"
                    component={ConverterStack}
                    options={({ navigation }) => ({
                        title: t('converter.header'),
                        drawerLabel: t('converter.header'),
                        drawerIcon: ({ focused, color, size }) => (
                            <FontAwesome
                                name="retweet"
                                style={iconStyle(focused, color, size - 2)}
                            />
                        ),
                        // headerRight: () => (
                        //     <DrawerButton
                        //         name="create"
                        //         onPress={() =>
                        //             navigation.navigate('EditPreset')
                        //         }
                        //     />
                        // ),
                    })}
                /> */}
                <Drawer.Screen
                    name="DepoStack"
                    component={DepoStack}
                    options={({ route }) => ({
                        title: t('headerDeposit'),
                        drawerLabel: route.params && route.params.DLabel,
                        // drawerLabel: t('headerDeposit'),
                        drawerIcon: ({ focused, color, size }) => (
                            <Entypo
                                name="wallet"
                                style={iconStyle(focused, color, size)}
                            />
                        ),
                    })}
                />
                <Drawer.Screen
                    name="CreditStack"
                    component={CreditStack}
                    options={() => ({
                        title: t('headerCredit'),
                        drawerLabel: t('headerCredit'),
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon
                                name="download"
                                style={iconStyle(focused, color, size)}
                            />
                        ),
                    })}
                />
                <Drawer.Screen
                    name="SettingsStack"
                    component={SettingsStack}
                    options={({ route }) => ({
                        title: t('settings.settings'),
                        // drawerLabel: t('settings.settings'),
                        drawerLabel: route.params && route.params.DLabel,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon
                                name="settings"
                                style={iconStyle(focused, color, size - 2)}
                            />
                        ),
                    })}
                />
                <Drawer.Screen
                    name="HelpStack"
                    component={HelpStack}
                    options={() => ({
                        title: t('help.header'),
                        drawerLabel: t('help.header'),
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon
                                name="help-circle"
                                style={iconStyle(focused, color, size - 2)}
                            />
                        ),
                    })}
                />
            </Drawer.Navigator>
        </>
    );
};

const AppContainer = () => {
    const selectLanguage = state => state.settings.language;
    const language = selectLanguage(store.getState());
    const reduxLocale = language === 0 ? 'ru' : 'en';
    i18n.locale = reduxLocale;
    const [locale, setLocale] = React.useState(reduxLocale);
    const localizationContext = React.useMemo(
        () => ({
            t: (scope, options) => i18n.t(scope, { locale, ...options }),
            locale,
            setLocale,
        }),
        [locale],
    );

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle="light-content"
                // backgroundColor="#525050"
            />
            <LocalizationContext.Provider value={localizationContext}>
                <NavigationContainer>
                    <Navigator />
                </NavigationContainer>
            </LocalizationContext.Provider>
        </SafeAreaProvider>
    );
};

type Props = {
    language: string,
    countryIP: boolean,
    currencies: Array<Object>,
    languageChanged: Function,
    countryChanged: Function,
    countryIpTriggered: Function,
};

type State = {
    userCountryCode?: string,
};

class App extends Component<Props, State> {
    state = {
        userCountryCode: currentLocale.substring(3),
    };

    componentDidMount() {
        SplashScreen.hide();
        RNLanguages.addEventListener('change', this.handleLanguageChange);
        // storeCurrencies();
        // cron.schedule('5,15,25,35,45,55 * * * *', () => {
        // cron.schedule('0-59 * * * *', () => {
        //     this.updateCurrenciesIfOutdated();
        // });
        // if (!this.props.countryIP) {
        //     fetch(config.ipUrl)
        //         .then(response => response.json())
        //         .then(responseJson => {
        //             this.setState({
        //                 userCountryCode: responseJson.country_code,
        //             });
        //             switch (this.state.userCountryCode) {
        //                 case 'RU':
        //                     this.onCountryChange(0);
        //                     break;
        //                 case 'UA':
        //                     this.onCountryChange(2);
        //                     break;
        //                 default:
        //                     this.onCountryChange(1);
        //             }
        //             this.onCountryIpTrigger(true);
        //         })
        //         .catch(error => {
        //             console.warn(
        //                 `There has been a problem with your fetch operation: ${error.message}`,
        //             );
        //         });
        // }
    }

    componentWillUnmount() {
        RNLanguages.removeEventListener('change', this.handleLanguageChange);
    }

    handleLanguageChange = ({ language }: { language: string }) => {
        i18n.locale = language;
        if (this.props.language !== this.pickerValue(i18n.currentLocale())) {
            this.props.languageChanged(this.pickerValue(i18n.currentLocale()));
        }
    };

    pickerValue = (locale: string) => {
        if (locale.substring(0, 2) === 'ru') {
            return 0;
        }
        return 1;
    };

    onCountryChange = (value: number) => {
        this.props.countryChanged(value);
    };

    onCountryIpTrigger = (bool: boolean) => {
        this.props.countryIpTriggered(bool);
    };

    updateCurrenciesIfOutdated = () => {
        const cdt = DateTime.local();
        const dt = DateTime.fromISO(this.props.currencies[1]?.updatedAt);
        if (cdt.minus({ hours: 1 }).toMillis() > dt.toMillis()) {
            storeCurrencies();
        }
    };

    render() {
        return <AppContainer />;
    }
}

const mapStateToProps = state => ({
    language: state.settings.language,
    countryIP: state.settings.countryIP,
    currencies: state.converter.currencies,
});
const mapDispatchToActions = {
    languageChanged,
    countryChanged,
    countryIpTriggered,
};

export default connect<any, any, any, any, any, any>(
    mapStateToProps,
    mapDispatchToActions,
)(App);
