import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Easing,
  PanResponder,
  Dimensions,
} from 'react-native';
import { LayerItem, SidebarOptions } from '../types';
import { useLayerContext } from '../provider/LayerProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SidebarLayerProps {
  layer: LayerItem;
}

export function SidebarLayer({ layer }: SidebarLayerProps) {
  const { removeLayer } = useLayerContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  const options = layer.options as SidebarOptions;
  const {
    backdrop = true,
    backdropOpacity = 0.5,
    animationType = 'spring',
    duration = 300,
    swipeToClose = true,
    width = SCREEN_WIDTH * 0.8,
    position = 'left',
  } = options;

  const initialTranslate = position === 'left' ? -width : width;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeToClose,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return swipeToClose && Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (position === 'left' && gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        } else if (position === 'right' && gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const shouldClose =
          position === 'left'
            ? gestureState.dx < -50 || gestureState.vx < -0.5
            : gestureState.dx > 50 || gestureState.vx > 0.5;

        if (shouldClose) {
          handleClose();
        } else {
          // Snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    translateX.setValue(initialTranslate);

    // Entry animation
    if (animationType === 'spring') {
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, translateX, animationType, duration, initialTranslate]);

  const handleClose = () => {
    // Exit animation
    if (animationType === 'spring') {
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: initialTranslate,
          useNativeDriver: true,
        }),
      ]).start(() => removeLayer(layer.id));
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: initialTranslate,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => removeLayer(layer.id));
    }
  };

  return (
    <Modal transparent visible animationType="none">
      <View style={[styles.container, { zIndex: layer.zIndex }]}>
        {backdrop && (
          <TouchableWithoutFeedback onPress={handleClose}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, backdropOpacity],
                  }),
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        <Animated.View
          style={[
            styles.sidebar,
            {
              width,
              [position]: 0,
              transform: [{ translateX }],
            },
          ]}
          {...(swipeToClose ? panResponder.panHandlers : {})}
        >
          {layer.content}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
