import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const animatedValue = new Animated.Value(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{translateX: buttonScale}, {translateY: buttonScale}],
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={[styles.wrapper]}>
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View style={[styles.button, animatedScaleStyle]}>
            <Text style={[styles.buttonText]}>Submit</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={[styles.backgroundShadow]}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowOffset: {width: 6, height: 6},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: 'black',
    elevation: 20,
  },
  wrapper: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundShadow: {
    height: 55,
    width: Dimensions.get('window').width - 52,
    backgroundColor: 'black',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-12%',
    marginLeft: '2.5%',
    zIndex: -1,
  },
  button: {
    height: 55,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#40E0D0',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: 'white', fontSize: 22, fontWeight: '600'},
});

export default App;
