// @flow
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    title: string,
    titleColor?: string,
    onPress: () => void,
};

const PickerButton = ({ title, titleColor, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
            <Text
                numberOfLines={1}
                style={[styles.textStyle, { color: titleColor }]}>
                {title}
            </Text>
            <Icon
                name="caret-down-sharp"
                style={[styles.arrowIosStyle, { color: titleColor }]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        // paddingRight: 10,
        alignItems: 'center',
        // justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        flex: 0.85,
        fontFamily: 'Ubuntu',
        fontWeight: 'normal',
        textAlignVertical: 'center',
    },
    arrowIosStyle: {
        flex: 0.2,
        fontSize: 15,
    },
});

export { PickerButton };
