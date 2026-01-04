import React, { useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { useLayerContext } from './LayerProvider';
import { ModalLayer } from '../components/ModalLayer';
import { DrawerLayer } from '../components/DrawerLayer';
import { SidebarLayer } from '../components/SidebarLayer';
import { ToastLayer } from '../components/ToastLayer';
import { MessageBoxLayer } from '../components/MessageBoxLayer';

/**
 * LayerHost renders all active layers
 */
export function LayerHost() {
  const { layers } = useLayerContext();

  // 监听层级变化，自动收起键盘
  useEffect(() => {
    if (layers.length > 0) {
      Keyboard.dismiss();
    }
  }, [layers.length]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {layers.map((layer) => {
        const key = layer.id;

        switch (layer.type) {
          case 'modal':
            return <ModalLayer key={key} layer={layer} />;
          case 'drawer':
            return <DrawerLayer key={key} layer={layer} />;
          case 'sidebar':
            return <SidebarLayer key={key} layer={layer} />;
          case 'toast':
            return <ToastLayer key={key} layer={layer} />;
          case 'messagebox':
            return <MessageBoxLayer key={key} layer={layer} />;
          default:
            return null;
        }
      })}
    </View>
  );
}
