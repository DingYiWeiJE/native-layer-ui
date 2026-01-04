import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Easing,
} from 'react-native';
import { LayerItem } from '../types';
import { useLayerContext } from '../provider/LayerProvider';

interface ModalLayerProps {
  layer: LayerItem;
}

export function ModalLayer({ layer }: ModalLayerProps) {
  const { removeLayer } = useLayerContext();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  const {
    backdrop = true,
    backdropOpacity = 0.5,
    animationType = 'spring',
    duration = 300,
  } = layer.options;

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
  }, [fadeAnim, scaleAnim, animationType, duration]);

  // 监听 closing 标记，执行退出动画
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
            styles.content,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  content: {
    maxWidth: '90%',
    maxHeight: '80%',
  },
});
