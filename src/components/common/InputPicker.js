// @flow
import React from 'react';
import { View, Text, Platform, ActionSheetIOS, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { PickerButton } from './PickerButton';

type Props = {
    label: string,
    selectedValue: number,
    options: string[],
    borderRight: Boolean,
    onValueChange: (buttonIndex: string | number) => void,
};

const InputPicker = ({
    label,
    selectedValue,
    onValueChange,
    options,
    borderRight,
}: Props) => {
    const {
        containerStyle,
        labelStyle,
        borderRightStyle,
        labelTextStyle,
        inputStyle,
        pickerStyle,
        pickerStyleIOS,
        itemStyle,
    } = styles;

    const onPress = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: [...options],
                destructiveButtonIndex: selectedValue,
                // tintColor: '#525050',
                // cancelButtonIndex: 0
            },
            buttonIndex => {
                onValueChange(buttonIndex);
            },
        );

    return (
        <View style={containerStyle}>
            <View style={[labelStyle, borderRight && borderRightStyle]}>
                <Text style={labelTextStyle}>{label}</Text>
            </View>
            <View style={inputStyle}>
                {/* {Platform.OS === 'android' ? ( */}
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    // mode="dropdown"
                    mode="dialog"
                    style={pickerStyle}
                    itemStyle={itemStyle}>
                    {options.map((item, index) => (
                        <Picker.Item label={item} value={index} key={item} />
                    ))}
                </Picker>
                {/* ) : (
                    <View style={pickerStyleIOS}>
                        <PickerButton
                            onPress={onPress}
                            title={options[selectedValue]}
                            titleColor="#525050"
                        />
                    </View>
                )} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        minHeight: 52,
        flexDirection: 'row',
    },
    labelStyle: {
        flex: 1.4,
        justifyContent: 'center',
    },
    borderRightStyle: { flex: 1.9, borderRightWidth: 1, borderColor: '#ddd' },
    labelTextStyle: {
        fontFamily: 'Ubuntu',
        paddingLeft: 10,
        paddingRight: 5,
    },
    inputStyle: {
        flex: 1.1,
    },
    pickerStyle: {
        flex: 1,
        marginLeft: 10,
    },
    pickerStyleIOS: {
        flex: 1,
        marginLeft: 10,
    },
    itemStyle: {
        color: '#525050',
        fontSize: 15,
        fontFamily: 'Ubuntu',
        fontWeight: 'normal',
    },
});

export { InputPicker };
