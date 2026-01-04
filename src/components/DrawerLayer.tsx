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
import { LayerItem, DrawerOptions } from '../types';
import { useLayerContext } from '../provider/LayerProvider';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DrawerLayerProps {
  layer: LayerItem;
}

export function DrawerLayer({ layer }: DrawerLayerProps) {
  const { removeLayer } = useLayerContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const dragY = useRef(0);

  const options = layer.options as DrawerOptions;
  const {
    backdrop = true,
    backdropOpacity = 0.5,
    animationType = 'spring',
    duration = 300,
    swipeToClose = true,
    dragHandle = true,
    snapPoints = [SCREEN_HEIGHT * 0.5],
  } = options;

  const maxHeight = Math.max(...snapPoints);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeToClose,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return swipeToClose && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.current = gestureState.dy;
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
        dragY.current = 0;
      },
    })
  ).current;

  useEffect(() => {
    // Entry animation
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
  }, [fadeAnim, translateY, animationType, duration]);

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
        Animated.spring(translateY, {
          toValue: SCREEN_HEIGHT,
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
          toValue: SCREEN_HEIGHT,
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
            styles.drawer,
            {
              maxHeight,
              transform: [{ translateY }],
            },
          ]}
          {...(swipeToClose ? panResponder.panHandlers : {})}
        >
          {dragHandle && (
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>
          )}
          <View style={styles.content}>{layer.content}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  drawer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});
