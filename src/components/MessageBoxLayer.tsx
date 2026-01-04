import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Easing,
} from 'react-native';
import { LayerItem, MessageBoxOptions } from '../types';
import { useLayerContext } from '../provider/LayerProvider';

interface MessageBoxLayerProps {
  layer: LayerItem;
}

export function MessageBoxLayer({ layer }: MessageBoxLayerProps) {
  const { removeLayer } = useLayerContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const options = layer.options as MessageBoxOptions;
  const {
    backdrop = true,
    backdropOpacity = 0.5,
    animationType = 'spring',
    duration = 300,
    autoClose,
    position = 'center',
  } = options;

  useEffect(() => {
    // Entry animation
    if (animationType === 'spring') {
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
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
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Auto close timer
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [fadeAnim, scaleAnim, animationType, duration, autoClose]);

  // 监听 closing 标记,执行退出动画
  useEffect(() => {
    if (layer.closing) {
      handleClose();
    }
  }, [layer.closing]);

  const handleClose = () => {
    // Exit animation
    if (animationType === 'spring') {
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.9,
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
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => removeLayer(layer.id));
    }
  };

  const containerStyle = [
    styles.container,
    position === 'top' && styles.top,
    position === 'center' && styles.center,
    position === 'bottom' && styles.bottom,
    { zIndex: layer.zIndex },
  ];

  return (
    <Modal transparent visible animationType="none">
      <View style={containerStyle}>
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
            styles.messageBox,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
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
    alignItems: 'center',
  },
  top: {
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  center: {
    justifyContent: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  messageBox: {
    maxWidth: '90%',
  },
});
