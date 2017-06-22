import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Button, StyleSheet } from 'react-native';
const ToolbarAndroid = require('ToolbarAndroid');

export default class Dashboard extends Component {
  navSecond() {
    this.props.navigator.push({
      id: 'camera'
    })
  }

  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
                        title="Dashboard"
                        logo={require('../logo.png')}
                        titleColor={'#FFFFFF'}/>

          <Button
            onPress={this.navSecond.bind(this)}
            title="Take picture"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fafafa',
    height: 56,
  },
});