import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onSelectionChange,
  onSubmitEditing,
  onFocus,
  onBlur,
  appInputStyle
}) => {
  const { containerStyle, labelStyle, labelTextStyle, inputStyle, inputTextStyle } = styles;

  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={containerStyle}>
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={inputStyle}>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            //autoCorrect={false}
            // style={inputTextStyle}
            style={[inputTextStyle, appInputStyle]}
            value={value}
            onChangeText={onChangeText}
            onSelectionChange={onSelectionChange}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            ref={input => {
              textInput = input;
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 52,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    //height: 52,
    minHeight: 52,
    flexDirection: 'row'
  },
  labelStyle: {
    flex: 1.9,
    borderRightWidth: 1,
    borderColor: '#ddd',
    // borderLeftWidth: 1,
    // borderTopWidth: 0.7,
    // borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  labelTextStyle: {
    //fontSize: 15,
    paddingLeft: 10,
    paddingRight: 5
  },
  inputStyle: {
    flex: 1.1,
    // textDecorationLine: 'underline',
    // height: 52,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRightWidth: 1,
    // borderLeftWidth: 0.5,
    // borderTopWidth: 0.7,
    // borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  inputTextStyle: {
    //fontSize: 15,
    //color: '#525050',
    paddingLeft: 10,
    paddingRight: 5
  }
};

export { Input };