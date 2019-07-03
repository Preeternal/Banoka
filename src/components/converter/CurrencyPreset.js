import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Animated, PanResponder, Dimensions,
} from 'react-native';
import { Icon } from 'native-base';

type Props = {
  char: string,
  onDelete: Function,
  onMove: Function,
};

type State = { position: number };

const { width } = Dimensions.get('window');

// const CurrencyPreset = ({ char, onDelete, onMove }: CurrencyType) => {
class CurrencyPreset extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          const newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: { x: width, y: 0 },
            duration: 300,
          }).start(() => {
            this.props.onDelete(this.props.char);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = { position };
  }

  setScrollViewEnabled = (enabled) => {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  };

  render() {
    const {
      containerStyle, deleteStyle, charStyle, charTextStyle, moveStyle,
    } = styles;
    return (
      <View style={styles.listItem}>
        <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText}>DELETE</Text>
          </View>
          <View style={containerStyle}>
            <TouchableOpacity style={deleteStyle} onPress={this.props.onDelete}>
              <Icon type="MaterialIcons" name="delete" style={{ fontSize: 22, color: 'gray' }} />
            </TouchableOpacity>
            <View style={charStyle}>
              <Text style={charTextStyle}>{this.props.char}</Text>
            </View>
            <TouchableOpacity style={moveStyle} onPress={this.props.onMove}>
              <Icon type="FontAwesome" name="sort" style={{ fontSize: 22, color: 'gray' }} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  listItem: {
    // height: 80,
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
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
  absoluteCellText: { margin: 16, color: '#FFF' },
  containerStyle: {
    // flex: 1,
    // borderBottomWidth: 1,
    // backgroundColor: '#fff',
    // borderColor: '#ddd',
    // minHeight: 52,
    // flexDirection: 'row',
    // flex: 1,
    width,
    // height: 80,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginLeft: 100,
    justifyContent: 'center',
    // alignItems: 'center',
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
};

export { CurrencyPreset };