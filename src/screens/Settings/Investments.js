// @flow
import React, { Component, Fragment } from 'react';
import { ScrollView, Platform, Text, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import * as RNIap from 'react-native-iap';
import 'number-to-locale-string';

import { Card, Header, CardSection, Button } from '../../components/common';

import { LocalizationContext } from '../../Context';

type State = {
    iapConnection: boolean,
    products: Array<Object>,
    purchased: boolean,
};

const prodItems = Platform.select({
    android: [
        'android.banoka.donat1',
        'android.banoka.donat2',
        'android.banoka.donat3',
        // 'android.test.purchased',
    ],
});

class Investments extends Component<{}, State> {
    static contextType = LocalizationContext;

    state = {
        iapConnection: false,
        products: [],
        purchased: false,
    };

    purchaseUpdateSubscription = null;

    purchaseErrorSubscription = null;

    async componentDidMount() {
        if (Platform.OS === 'android') {
            // try {
            //     const iapConnection = await RNIap.initConnection();
            //     const products = await RNIap.getProducts(prodItems);
            //     this.setState({ iapConnection, products });
            //     const purchases = await RNIap.getAvailablePurchases();
            //     if (purchases.length) {
            //         // await RNIap.consumeAllItemsAndroid(); did not work as expected, need to open issue
            //         purchases.map(async purchase => {
            //             await RNIap.consumePurchaseAndroid(
            //                 purchase.purchaseToken,
            //             );
            //         });
            //     }
            //     this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
            //         purchase => {
            //             if (
            //                 purchase.transactionReceipt &&
            //                 this.state.products.length
            //             ) {
            //                 this.setState(prevState => ({
            //                     products: prevState.products.filter(
            //                         product =>
            //                             purchase.productId !==
            //                             product.productId,
            //                     ),
            //                     purchased: true,
            //                 }));
            //             }
            //         },
            //     );
            //     this.purchaseErrorSubscription = RNIap.purchaseErrorListener(
            //         error => {
            //             console.warn('purchaseErrorListener', error);
            //             Alert.alert('purchase error', JSON.stringify(error));
            //         },
            //     );
            // } catch (err) {
            //     console.warn(err.code, err.message);
            // }
        }
    }

    componentWillUnmount() {
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }
        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }
    }

    buyItem = async (sku: string) => {
        // try {
        //     await RNIap.requestPurchase(sku);
        //     this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
        //         purchase => {
        //             if (
        //                 purchase.transactionReceipt &&
        //                 this.state.products.length
        //             ) {
        //                 this.setState(prevState => ({
        //                     products: prevState.products.filter(
        //                         product =>
        //                             purchase.productId !== product.productId,
        //                     ),
        //                     purchased: true,
        //                 }));
        //             }
        //         },
        //     );
        // } catch (err) {
        //     console.warn(err.code, err.message);
        //     this.purchaseErrorSubscription = RNIap.purchaseErrorListener(
        //         error => {
        //             console.warn('purchaseErrorListener', error);
        //             Alert.alert('purchase error', JSON.stringify(error));
        //         },
        //     );
        // }
    };

    render() {
        const { t } = this.context;
        return (
            <Fragment>
                <ScrollView style={{ flex: 1 }}>
                    {Platform.OS === 'android' &&
                        this.state.iapConnection &&
                        this.state.products && (
                            <Card>
                                <Header
                                    headerText={t('settings.donat.investments')}
                                />
                                {this.state.purchased && (
                                    <CardSection>
                                        <Text
                                            style={{
                                                fontFamily: 'Ubuntu',
                                                fontSize: 17,
                                                margin: 10,
                                                textAlign: 'center',
                                            }}>
                                            {t('settings.donat.thanks')}
                                        </Text>
                                    </CardSection>
                                )}
                                {this.state.products.map((product, i) => (
                                    <CardSection key={i.toString()}>
                                        <Text
                                            style={{
                                                fontFamily: 'Ubuntu',
                                                marginTop: 10,
                                                textAlign: 'center',
                                            }}>
                                            {`${t('settings.donat.header')} ${t(
                                                'settings.donat.for',
                                            )} ${product.localizedPrice}`}
                                        </Text>
                                        <Button
                                            rounded
                                            title={product.localizedPrice}
                                            titleColor="white"
                                            onPress={() =>
                                                this.buyItem(product.productId)
                                            }
                                            color="white"
                                            customStyle={{
                                                backgroundColor: '#525050',
                                                alignSelf: 'center',
                                                width: 150,
                                            }}
                                            icon={() => (
                                                <FontAwesome5
                                                    type="FontAwesome5"
                                                    name="donate"
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 18,
                                                        marginEnd: 10,
                                                    }}
                                                />
                                            )}
                                        />
                                    </CardSection>
                                ))}
                            </Card>
                        )}
                </ScrollView>
            </Fragment>
        );
    }
}

export default Investments;
