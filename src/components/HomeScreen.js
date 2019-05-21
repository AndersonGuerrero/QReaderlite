import React, {Component} from 'react';
import { AppRegistry, Button,
         StyleSheet, View, Text, Platform,
         Linking, Clipboard, Share } from 'react-native';

import firebase from 'react-native-firebase';

export default class HomeScreen extends Component {

  constructor(){
    super()
    this.state = {}
  }

  onShare = async (qrData) => {
    try {
      const result = await Share.share({
        message:
          qrData,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  _setCopyData(data) {
    Clipboard.setString(data);
  }

  _openLink(url){
    Linking
      .openURL(url)
      .catch(err =>  console.log('An error occured'));
  }

  render() {
    const { navigation } = this.props;
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const qrData = navigation.getParam('qrData', null);

    const unitId =
      Platform.OS === 'ios'
        ? 'ca-app-pub-5071583126311655/9718521540'
        // : 'ca-app-pub-3940256099942544/6300978111';
        : 'ca-app-pub-5071583126311655/9718521540';
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.titleText}>QReader Lite</Text>
        </View>
        <View style={styles.detailContainer}>
            { qrData
              ?
                <View style={{flex: 2}}>
                  <Text>Detalles del Sacan</Text>
                  <Text style={styles.boxDetail}>
                  { qrData }
                  </Text>
                  <View style={styles.divOpenLink}>
                    { qrData.indexOf('http://') > -1 || qrData.indexOf('https://') > -1
                      ?
                          <Button style={styles.flexButton}
                          onPress={() => this._openLink(qrData)}
                          color="#47a728"
                          title="Abrir web" />
                        : null
                    }
                      <Button style={styles.flexButton}
                        onPress={() => this._setCopyData(qrData)}
                        color="#012129"
                        title="Copiar" />
                      <Button onPress={()=>this.onShare(qrData)} title="Share" />
                    </View>
                </View>
              :
              <View style={{flex: 2}}>
                <Text style={styles.notScan}>
                 No Scan
                </Text>
              </View>
            }
          <View style={{flex: 1}}>
            <Button
            onPress={() => navigation.navigate('ScanScreen')}
            title="Scan" />
          </View>
        </View>
        <Banner
          unitId={unitId}
          size={'LARGE_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={(e) => {
            console.log(String(e));
          }}>
        </Banner>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center'
  },
  header: {
   height: 50,
   backgroundColor: '#05a5d1'
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  boxDetail:{
    margin: 20,
    backgroundColor: '#f1f1f1',
    height: 100,
    width: "85%"
  },
  divOpenLink: {
    flex: 1,
    marginTop: -15,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  buttonContainer: {
    margin: 20,
    textAlign: 'center',
  },
  notScan: {
    margin: 20,
    marginTop: 35,
    textAlign: 'center',
    fontSize: 60,
    color: '#f1f1f1'
  },
  detailContainer: {
    flex: 3,
    margin: 20
  },
  flexButton: {
    padding: '5px',
    width: '50px',
    height: '50px',
    margin: '5px',
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
