import React, {useState} from 'react';
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

  const animatedValueRetry = new Animated.Value(0);

  const animatedValueRotate = new Animated.Value(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const buttonRetry = animatedValueRetry.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const buttonRotate = animatedValueRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-900deg'],
  });
  const [rotateView, setRotateView] = useState(false);

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

  const animatedRetry = {
    transform: [
      {
        scale: buttonRetry,
      },
    ],
  };
  const animatedRotate = {
    transform: [
      {
        rotate: buttonRotate,
      },
    ],
  };
  const onPressInRetry = () => {
    Animated.timing(animatedValueRetry, {
      toValue: 0.1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onPressOutRetry = () => {
    Animated.timing(animatedValueRetry, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onPressInRotate = () => {
    // setRotateView(true);
    Animated.timing(animatedValueRotate, {
      toValue: 0.1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onPressOutRotate = () => {
    Animated.timing(animatedValueRotate, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    // setRotateView(false);
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

        <View style={{marginVertical: '5%'}}>
          <TouchableWithoutFeedback
            onPressIn={onPressInRetry}
            onPressOut={onPressOutRetry}>
            <Animated.View
              style={[styles.button, animatedRetry, styles.shadowProp]}>
              <Text style={[styles.buttonText]}>Retry</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{marginVertical: '5%'}}>
          <TouchableWithoutFeedback
            onPressIn={onPressInRotate}
            onPressOut={onPressOutRotate}>
            <Animated.View
              style={[
                {
                  width: 60,
                  height: 60,
                  backgroundColor: 'orange',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                },
                animatedRotate,
                // styles.shadowProp,
              ]}>
              <Text style={[styles.buttonText, {fontSize: 28}]}>
                {rotateView ? 'x' : '+'}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
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
