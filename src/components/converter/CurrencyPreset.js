// @flow
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { SwipeRow } from 'react-native-swipe-list-view';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  char: string,
  onDelete: Function,
  onMove: Function,
  onLongPress: Function,
  onPressOut: Function,
  preset: Array<string>,
  presetChanged: Function,
  isActive: boolean,
};

const { width } = Dimensions.get('window');

class CurrencyPreset extends Component<Props> {
  onPresetChange = (array) => {
    this.props.presetChanged(array);
  };

  deleteListItem = () => {
    const preset = this.props.preset.filter(i => i !== this.props.char);
    this.onPresetChange(preset);
  };

  render() {
    const {
      listItem,
      absoluteCell,
      absoluteCellText,
      containerStyle,
      active,
      deleteStyle,
      charStyle,
      charTextStyle,
      moveStyle,
      iconStyle,
    } = styles;
    return (
      <SwipeRow
        style={listItem}
        leftOpenValue={width}
        stopLeftSwipe={width}
        onRowOpen={this.deleteListItem}
        disableLeftSwipe
      >
        <View style={absoluteCell}>
          <Text style={absoluteCellText}>{strings('converter.DELETE')}</Text>
        </View>
        <View style={[containerStyle, this.props.isActive && active]}>
          <TouchableOpacity style={deleteStyle} onPress={this.props.onDelete}>
            <Icon type="MaterialIcons" name="delete" style={iconStyle} />
          </TouchableOpacity>
          <View style={charStyle}>
            <Text style={charTextStyle}>{this.props.char}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={moveStyle}
            onPress={this.props.onMove}
            onLongPress={this.props.onLongPress}
            onPressOut={this.props.onPressOut}
          >
            <Icon type="FontAwesome" name="sort" style={iconStyle} />
          </TouchableOpacity>
        </View>
      </SwipeRow>
    );
  }
}

const styles = {
  listItem: {
    minHeight: 52,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absoluteCellText: { marginRight: 15, color: '#FFF' },
  containerStyle: {
    width,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    flexDirection: 'row',
  },
  active: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  deleteStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  charStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  charTextStyle: {
    fontSize: 13,
  },
  moveStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 15,
  },
  iconStyle: {
    fontSize: 22,
    color: 'gray',
  },
};

const mapStateToProps = state => ({
  preset: state.converter.preset,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(CurrencyPreset);
