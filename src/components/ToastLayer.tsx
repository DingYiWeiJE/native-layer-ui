import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LayerItem, ToastOptions } from '../types';
import { useLayerContext } from '../provider/LayerProvider';

interface ToastLayerProps {
  layer: LayerItem;
}

export function ToastLayer({ layer }: ToastLayerProps) {
  const { removeLayer } = useLayerContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;

  const options = layer.options as ToastOptions;
  const {
    animationType = 'spring',
    duration = 300,
    autoClose = 3000,
    position = 'top',
  } = options;

  useEffect(() => {
    // Entry animation
    const initialTranslate = position === 'top' ? -50 : position === 'bottom' ? 50 : 0;
    translateY.setValue(initialTranslate);

    if (animationType === 'spring') {
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
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
        Animated.timing(translateY, {
          toValue: 0,
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
  }, [fadeAnim, translateY, animationType, duration, autoClose, position]);

  // 监听 closing 标记，执行退出动画
  useEffect(() => {
    if (layer.closing) {
      handleClose();
    }
  }, [layer.closing]);

  const handleClose = () => {
    const finalTranslate = position === 'top' ? -50 : position === 'bottom' ? 50 : 0;

    // Exit animation
    if (animationType === 'spring') {
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: finalTranslate,
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
        Animated.timing(translateY, {
          toValue: finalTranslate,
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
    <View style={containerStyle} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        {layer.content}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  top: {
    top: 50,
  },
  center: {
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  bottom: {
    bottom: 50,
  },
  toast: {
    maxWidth: '90%',
  },
});
