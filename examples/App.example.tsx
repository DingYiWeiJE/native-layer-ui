import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LayerProvider, LayerHost, Layer } from 'native-layer-ui';

function DemoScreen() {
  // Modal Example
  const showModal = () => {
    const controller = Layer.showModal(
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Welcome!</Text>
        <Text style={styles.modalText}>This is a beautiful modal</Text>
        <Button title="Close" onPress={() => controller.close()} />
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.6,
        animationType: 'spring',
      }
    );
  };

  // Drawer Example
  const showDrawer = () => {
    Layer.showDrawer(
      <View style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>Bottom Drawer</Text>
        <Text style={styles.drawerText}>Swipe down to close</Text>
      </View>,
      {
        swipeToClose: true,
        dragHandle: true,
        snapPoints: [300],
        exclusive: true,
      }
    );
  };

  // Sidebar Example
  const showSidebar = () => {
    Layer.showSidebar(
      <View style={styles.sidebarContent}>
        <Text style={styles.sidebarTitle}>Menu</Text>
        <Button title="Home" onPress={() => {}} />
        <Button title="Profile" onPress={() => {}} />
        <Button title="Settings" onPress={() => {}} />
      </View>,
      {
        width: 280,
        position: 'left',
        swipeToClose: true,
        exclusive: true,
      }
    );
  };

  // Toast Example
  const showSuccessToast = () => {
    Layer.showToast(
      <View style={styles.toastSuccess}>
        <Text style={styles.toastText}>✓ Success!</Text>
      </View>,
      {
        autoClose: 2000,
        position: 'top',
        animationType: 'spring',
      }
    );
  };

  const showErrorToast = () => {
    Layer.showToast(
      <View style={styles.toastError}>
        <Text style={styles.toastText}>✗ Error occurred</Text>
      </View>,
      {
        autoClose: 2000,
        position: 'bottom',
        animationType: 'spring',
      }
    );
  };

  // MessageBox Example
  const showMessageBox = () => {
    const controller = Layer.showMessageBox(
      <View style={styles.messageBox}>
        <Text style={styles.messageTitle}>Confirm Action</Text>
        <Text style={styles.messageText}>Are you sure you want to proceed?</Text>
        <View style={styles.messageButtons}>
          <Button title="Cancel" onPress={() => controller.close()} />
          <Button
            title="Confirm"
            onPress={() => {
              controller.close();
              showSuccessToast();
            }}
          />
        </View>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        position: 'center',
      }
    );
  };

  // Close All Example
  const closeAll = () => {
    Layer.closeAll();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Native Layer UI Examples</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal</Text>
          <Button title="Show Modal" onPress={showModal} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Drawer (Bottom Sheet)</Text>
          <Button title="Show Drawer" onPress={showDrawer} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sidebar</Text>
          <Button title="Show Sidebar" onPress={showSidebar} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toast</Text>
          <Button title="Show Success Toast" onPress={showSuccessToast} />
          <View style={styles.spacer} />
          <Button title="Show Error Toast" onPress={showErrorToast} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MessageBox</Text>
          <Button title="Show MessageBox" onPress={showMessageBox} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controls</Text>
          <Button title="Close All Layers" onPress={closeAll} color="red" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <LayerProvider>
      <DemoScreen />
      <LayerHost />
    </LayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  spacer: {
    height: 10,
  },
  // Modal styles
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    width: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  // Drawer styles
  drawerContent: {
    padding: 30,
    backgroundColor: 'white',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  drawerText: {
    fontSize: 16,
    color: '#666',
  },
  // Sidebar styles
  sidebarContent: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  // Toast styles
  toastSuccess: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastError: {
    backgroundColor: '#f44336',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // MessageBox styles
  messageBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: 320,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  messageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
