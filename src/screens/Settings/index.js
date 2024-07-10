// @flow
import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18n-js';
import 'number-to-locale-string';

import { languageChanged, countryChanged } from '../../actions';
import {
    InputPicker,
    Card,
    Header,
    TableSection,
} from '../../components/common';
import images from '../../assets/images';

import { LocalizationContext } from '../../Context';

const Settings = () => {
    const language = useSelector(state => state.settings.language);
    const country = useSelector(state => state.settings.country);
    const dispatch = useDispatch();
    const { t, setLocale } = React.useContext(LocalizationContext);

    const onLanguageChange = (value: number) => {
        dispatch(languageChanged(value));
        setLocale(value === 0 ? 'ru' : 'en');
        i18n.locale = value === 0 ? 'ru' : 'en';
    };

    const onCountryChange = (value: number) => {
        dispatch(countryChanged(value));
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <Card>
                {/* <Header headerText="Локальные данные" /> */}
                <Header headerText={t('settings.localization')} />

                <TableSection>
                    <InputPicker
                        // label="Язык"
                        label={t('settings.language')}
                        options={['русский', 'english']}
                        selectedValue={language}
                        onValueChange={onLanguageChange}
                        borderRight
                    />
                    {/* <InputPicker
                        // label="Страна"
                        label={t('settings.country')}
                        options={['Россия', 'Other', 'Украина']}
                        selectedValue={country}
                        onValueChange={onCountryChange}
                        borderRight
                    /> */}
                </TableSection>
                <View style={styles.container}>
                    <Image
                        resizeMode="cover"
                        source={images.banoka}
                        style={styles.topImage}
                    />
                </View>
            </Card>
        </ScrollView>
    );
};

const styles = {
    container: {
        backgroundColor: 'white',
    },
    topImage: {
        // width: 270,
        height: 400,
        flex: 1,
        alignSelf: 'flex-end',
    },
};

export default Settings;
