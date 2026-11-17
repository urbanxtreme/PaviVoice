
import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

export default function App() {
  const [isListening, setIsListening] = useState(false);

  // Animation values
  const pulse = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0.35)).current;

  // Continuous orb pulse
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulse, {
            toValue: isListening ? 1.09 : 1.035,
            duration: isListening ? 450 : 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: isListening ? 0.9 : 0.55,
            duration: isListening ? 450 : 1400,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(pulse, {
            toValue: 1,
            duration: isListening ? 450 : 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glow, {
            toValue: 0.2,
            duration: isListening ? 450 : 1400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();

  }, [isListening, pulse, glow]);


  // Continuous ring rotation
  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();

    return () => rotateAnimation.stop();

  }, [rotation]);


  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  const toggleAssistant = () => {
    setIsListening(previous => !previous);
  };


  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#080D18"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>J.A.R.V.I.S</Text>
        <Text style={styles.version}>
          PERSONAL AI SYSTEM
        </Text>
      </View>


      {/* MAIN */}
      <View style={styles.main}>

        <Text style={styles.greeting}>
          GOOD EVENING
        </Text>

        <Text style={styles.title}>
          How can I help you?
        </Text>


        {/* ASSISTANT ORB */}
        <Pressable
          onPress={toggleAssistant}
          style={styles.orbArea}
        >

          {/* Animated outer glow */}
          <Animated.View
            style={[
              styles.glow,
              {
                opacity: glow,
                transform: [{ scale: pulse }],
              },
            ]}
          />

          {/* Rotating ring */}
          <Animated.View
            style={[
              styles.rotatingRing,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />

          {/* Pulsating orb */}
          <Animated.View
            style={[
              styles.outerOrb,
              {
                transform: [{ scale: pulse }],
              },
            ]}

          >

            <View style={styles.middleOrb}>

              <View style={styles.innerOrb}>
                <Text style={styles.orbSymbol}>
                  {isListening ? '◉' : '✦'}
                </Text>
              </View>

            </View>

          </Animated.View>

        </Pressable>


        {/* STATUS */}
        <Text style={styles.status}>
          {isListening ? 'LISTENING...' : 'SYSTEM READY'}
        </Text>

        <Text style={styles.instruction}>
          {isListening
            ? 'Listening mode activated'
            : 'Tap the orb to activate JARVIS'}
        </Text>

      </View>


      {/* FOOTER */}
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          YOUR PERSONAL INTELLIGENCE
        </Text>

        <Text style={styles.footer}>
          JARVIS • VERSION 0.2.0
        </Text>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#080D18',
    paddingHorizontal: 25,
  },

  header: {
    marginTop: 35,
    alignItems: 'center',
  },

  logo: {
    color: '#EAF5FF',
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 6,
  },

  version: {
    color: '#527B9E',
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 8,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  greeting: {
    color: '#579BC8',
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 15,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '300',
  },

  orbArea: {
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 30,
  },

  glow: {
    position: 'absolute',
    width: 215,
    height: 215,
    borderRadius: 108,
    backgroundColor: '#168FEA',
  },

  rotatingRing: {
    position: 'absolute',
    width: 245,
    height: 245,
    borderRadius: 123,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#70D5FF',
    borderRightColor: '#287CB5',
  },

  outerOrb: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#102B45',
    borderWidth: 1,
    borderColor: '#285D83',
    justifyContent: 'center',
    alignItems: 'center',
  },

  middleOrb: {
    width: 165,
    height: 165,
    borderRadius: 83,
    backgroundColor: '#17476B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerOrb: {
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: '#287FB9',
    borderWidth: 2,
    borderColor: '#75CCFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
  },

  orbSymbol: {
    color: '#FFFFFF',
    fontSize: 43,
  },

  status: {
    color: '#64C8FF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
  },

  instruction: {
    color: '#71869B',
    fontSize: 12,
    marginTop: 12,
  },

  bottom: {
    alignItems: 'center',
    marginBottom: 35,
  },

  bottomText: {
    color: '#52718D',
    fontSize: 10,
    letterSpacing: 2,
  },

  footer: {
    color: '#34495D',
    fontSize: 9,
    marginTop: 15,
    letterSpacing: 2,
  },

});
