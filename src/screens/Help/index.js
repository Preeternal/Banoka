import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { LocalizationContext } from '../../Context';
import { CardSection, Card, Header } from '../../components/common';

const Help = () => {
    const { main, bold } = styles;
    const { t } = React.useContext(LocalizationContext);
    const language = useSelector(state => state.settings.language);
    return (
        <ScrollView key={language} style={{ flex: 1 }}>
            <Card>
                <Header headerText={t('help.definitions')} />
                <CardSection>
                    <Text
                        style={[bold, { fontFamily: 'Ubuntu', marginTop: 10 }]}>
                        {t('help.paymentType.header')}
                    </Text>
                    <Text style={main}>
                        {t('help.paymentType.text')}
                        {'\n'}
                        {t('help.paymentType.text2')}
                    </Text>
                    <Text style={bold}>{t('help.edinCom.header')}</Text>
                    <Text style={main}>{t('help.edinCom.text')}</Text>
                    <Text style={bold}>{t('help.startCostCom.header')}</Text>
                    <Text style={main}>{t('help.startCostCom.text')}</Text>
                    <Text style={bold}>{t('help.finCostCom.header')}</Text>
                    <Text style={main}>{t('help.finCostCom.text')}</Text>
                    <Text style={bold}>{t('help.acCountCom.header')}</Text>
                    <Text style={main}>{t('help.acCountCom.text')}</Text>
                    <Text style={bold}>{t('help.payment.header')}</Text>
                    <Text style={main}>{t('help.payment.text')}</Text>
                    <Text style={bold}>{t('help.overpayment.header')}</Text>
                    <Text style={main}>{t('help.overpayment.text')}</Text>
                </CardSection>
            </Card>
            <Card>
                <Header headerText={t('help.eula')} />
                <CardSection>
                    <Text style={main}>
                        Использование Приложения означает безоговорочное
                        согласие пользователя с настоящей Политикой и указанными
                        в ней условиями обработки его персональной информации и
                        подтверждает, что, давая такое согласие, он действует
                        свободно, своей волей и в своем интересе; в случае
                        несогласия с этими условиями пользователь должен
                        воздержаться от использования Приложения. Приложение не
                        подразумевает регистрацию пользователей и хранение
                        информации о пользователе вне устройства пользователя.
                        Однако, для улучшения пользовательского опыта,
                        приложение может кэшировать настройки и установки
                        приложения, изменённые пользователем, непосредственно на
                        устройстве пользователя. Для определения локальных
                        данных пользователя, с целью персонализации
                        предоставляемых сервисов по стране нахождения
                        пользователя, возможно незначительное использование
                        интернет трафика. Настоящая Политика применима только к
                        программному коду Banoka. Banoka не контролирует и не
                        несет ответственность за программный код третьих лиц.
                    </Text>
                </CardSection>
            </Card>
            <Card>
                <Header headerText={t('help.guarantees')} />
                <CardSection>
                    <Text style={main}>
                        Приложение предоставляется на условиях &#34;КАК
                        ЕСТЬ&#34;, без каких либо явных или подразумеваемых
                        гарантий. Правообладатель не предоставляет никаких
                        гарантий в отношении безошибочной и бесперебойной работы
                        приложения, соответствия содержимого приложения
                        конкретным целям пользователя.
                    </Text>
                </CardSection>
            </Card>
        </ScrollView>
    );
};

const styles = {
    main: {
        fontFamily: 'Ubuntu',
        margin: 10,
        textAlign: 'justify',
    },
    bold: {
        fontFamily: 'Ubuntu',
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold',
    },
};

export default Help;
