import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { LayerProvider, LayerHost, Layer } from 'native-layer-ui';

// 假设你的 rem 工具函数
const rem = (value: number) => value * 16; // 示例实现

function TestPageContent() {
  const handleCapture = () => {
    Layer.showModal(
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>测试弹窗</Text>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="测试我的UI库弹窗" onPress={handleCapture} />
    </View>
  );
}

export default function TestPage() {
  return (
    <LayerProvider>
      <TestPageContent />
      <LayerHost />
    </LayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: rem(100),
    width: rem(300),
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
});
