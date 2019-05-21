import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  Linking, Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  constructor(){
    super()
    this.state = {}
  }

  onSuccess = (e) => {
    const {navigate} = this.props.navigation;
    navigate('Home', {qrData: e.data})
  }

  render() {
    return (
      <View>
        <QRCodeScanner
          title={'Scan Code'}
          onRead={this.onSuccess}
          cameraStyle={styles.cameraContainer}
          topViewStyle={styles.zeroContainer}
          bottomViewStyle={styles.zeroContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    divads: {
      backgroundColor: 'blue'
    },
    zeroContainer: {
      height: 0,
      flex: 0,
    },
    cameraContainer: {
      height: Dimensions.get('window').height
    },
  });
