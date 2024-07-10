// @flow

import React, { Component } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import VersionNumber from 'react-native-version-number';

import { screenOrientationChanged } from '../../actions';
import { strings } from '../../../locales/i18n';
import images from '../../assets/images';

type Props = any;
type State = {
    isLandscape: boolean,
};

class DrawerScreen extends Component<Props, State> {
    state = {
        isLandscape: false,
    };

    componentDidMount() {
        this.handle();
        Dimensions.addEventListener?.('change', this.handle);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener?.('change', this.handle);
    }

    handle = () => {
        this.setState({ isLandscape: this.isLandscape() });
    };

    isLandscape = () => {
        const dim = Dimensions.get('window');
        const isLandscape = dim.width >= dim.height;
        this.props.screenOrientationChanged(isLandscape);
        return isLandscape;
    };

    render() {
        const { drawerImage, contentContainerStyle, menuItem } = styles;
        const { isLandscape } = this.state;

        return (
            <>
                <Image
                    resizeMode="cover"
                    style={[drawerImage, { height: isLandscape ? 70 : 215 }]}
                    source={images.logo}
                />
                <DrawerContentScrollView
                    contentContainerStyle={contentContainerStyle}
                    {...this.props}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <DrawerItemList {...this.props} />
                    </View>
                    {!isLandscape && (
                        <View style={menuItem}>
                            <Text>
                                {`${strings('appVersion')} ${
                                    VersionNumber.appVersion || ''
                                }`}
                            </Text>
                        </View>
                    )}
                </DrawerContentScrollView>
            </>
        );
    }
}

const mapDispatchToActions = { screenOrientationChanged };

export default connect<any, any, any, any, any, any>(
    null,
    mapDispatchToActions,
)(DrawerScreen);

const styles = {
    drawerImage: {
        alignSelf: 'center',
        width: '100%',
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    menuItem: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: 20,
    },
};
