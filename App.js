import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {notificationManager} from './src/NotificationManager';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.localNotify = null;
    this.senderID = '906161312534';
  }

  componentDidMount() {
    this.localNotify = notificationManager;
    this.localNotify.configure(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
      this.senderID,
    );
  }

  onRegister(token) {
    console.log('[Notification] Registered: ', token);
  }

  onNotification(notify) {
    console.log('[Notification] onNotification: ', notify);
  }

  onOpenNotification(notify) {
    console.log('[Notification] onOpenNotification: ', notify);
    alert('Open Notification' + notify.title);
  }

  onPressCancelNotification = () => {
    this.localNotify.cancelAllLocalNotification();
  };
  /*
  onPressSendNotification = () => {
    const options = {
      soundName: 'default', //'notification1.mp3',
      playSound: true,
      vibrate: true,
    };

    this.localNotify.showNotification(
      1,
      '창남창녀',
      'Local Notification',
      {}, // data
      options, // options
    );
  };
*/
  onPressSendNotification = () => {
    console.log('hi');
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAA0vtsUxY:APA91bGoEh1F3F7n94wN1TJUXZxl1_zOwyUqgpAss1GMwg0--DBhHBSVcExsNqHb4u88nuPvCH6HcEcKV7etYqR7aNcr_ZhzNkbA3ztIqyvsmuEmI67q2uPNDNu95wGjT7RknIkreX64',
      },
      body: JSON.stringify({
        to:
          'fFX_ne3STa6aPP2IHbCOsD:APA91bEO5dRFAC0p6t3KLbyHkOft3_3j5NqxHCr0aEa0-iYX123ycCquO_dEIym2r3ZZ3sBxtjEsEjXOvrZ6rEEfl3h_ZTRxiwWV8hl1hn2PicKdZ4Jw11uGlb0QHZuL6Zu8_DT6_ZPQ',
        priority: 'high',
        notification: {
          body: 'hiveeeeeee2221221',
        },
      }),
    });
  };

  render() {
    let {container, button} = styles;
    return (
      <View style={container}>
        <TouchableOpacity style={button} onPress={this.onPressSendNotification}>
          <Text> Send notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={button}
          onPress={this.onPressCancelNotification}>
          <Text> Cancel notification</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10,
  },
});
