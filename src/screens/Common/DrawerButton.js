import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import Icon, { type IoniconsGlyphs } from 'react-native-vector-icons/Ionicons';
import MaterialIcons, {
    type MaterialIconsGlyphs,
} from 'react-native-vector-icons/MaterialIcons';

type Props = {
    type?: 'MaterialIcons',
    name?: {| ...IoniconsGlyphs, ...MaterialIconsGlyphs |},
    onPress: () => void,
};
const DrawerButton = (props: Props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{ padding: 10 }}>
                {!!props.type && !!props.name ? (
                    <MaterialIcons
                        name={props.name}
                        style={{ fontSize: 25, color: 'white' }}
                    />
                ) : (
                    <Icon
                        name={props.name || 'menu'}
                        style={{
                            fontSize: !props.name ? 30 : 25,
                            color: 'white',
                        }}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default DrawerButton;
