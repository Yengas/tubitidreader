import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  descriptionText: string,
  inactivityText: string,
  inactive: boolean,
};

export class CameraClosed extends PureComponent<Props> {
  static defaultProps = {
    descriptionText: 'Press here to start scanning for qr codes!',
    inactivityText: "Camera has been closed because of inactivity.\nPress again to activate.",
    inactive: false,
  };

  render(){
    const { inactive, inactivityText, descriptionText } = this.props;

    return (
      <View style={[styles.container, this.props.style]}>
        <MCIcon name={"qrcode-scan"} size={60} />
        <Text style={styles.titleText}>{inactive ? inactivityText : descriptionText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

export default CameraClosed;
