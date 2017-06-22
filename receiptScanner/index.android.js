import React, { Component } from 'react';
import { AppRegistry, Navigator, BackAndroid } from 'react-native';

import CameraView from './app/camera';
import Dashboard from './app/dashboard';

let _navigator; // we fill this up upon on first navigation.

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});


class ReceiptScanner extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'dashboard'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;

    switch (route.id) {
      case 'dashboard':
        return (<Dashboard navigator={navigator} title="dashboard"/>);
      case 'camera':
        return (<CameraView navigator={navigator} title="camera" />);
    }
  }
}

// class ReceiptScanner extends Component {
//   render() {
//     const routes = [
//       {title: 'Dashboard', index: 0} //        initialRouteStack={routes}
//       // {title: 'Camera', index: 1},
//     ];
//     return (
//       <Navigator
//         initialRoute={routes[0]}
//         renderScene={(route, navigator) =>
//           <Dashboard 
//             onForward={() => {
//               navigator.push({
//                 component: CameraView
//               });
//             }}
//             onBack={() => {
//               if (route.index > 0) {
//                 navigator.pop();
//               }
//             }}
//           />
//         }
//       />
//     )
//   }
// }

AppRegistry.registerComponent('receiptScanner', () => ReceiptScanner);
