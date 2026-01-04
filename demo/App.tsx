import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LayerProvider } from '../src';
import {
  BasicModalDemo,
  ConfirmDialogDemo,
  FormModalDemo,
  ContentModalDemo,
  LoadingModalDemo,
  SuccessModalDemo,
  SelectListModalDemo,
} from './ModalDemo';

export default function App() {
  return (
    <LayerProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Native Layer UI</Text>
            <Text style={styles.subtitle}>弹窗示例集合</Text>
          </View>

          <BasicModalDemo />
          <ConfirmDialogDemo />
          <FormModalDemo />
          <ContentModalDemo />
          <LoadingModalDemo />
          <SuccessModalDemo />
          <SelectListModalDemo />
        </ScrollView>
      </SafeAreaView>
    </LayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
