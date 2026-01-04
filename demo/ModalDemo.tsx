import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Layer } from '../src';

/**
 * 基础弹窗示例
 */
export function BasicModalDemo() {
  const showBasicModal = () => {
    const controller = Layer.showModal(
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>基础弹窗</Text>
        <Text style={styles.modalText}>这是一个简单的弹窗示例</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => controller.close()}
        >
          <Text style={styles.buttonText}>关闭</Text>
        </TouchableOpacity>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>基础弹窗</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showBasicModal}>
        <Text style={styles.demoButtonText}>打开弹窗</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 确认对话框示例
 */
export function ConfirmDialogDemo() {
  const showConfirmDialog = () => {
    const controller = Layer.showModal(
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogTitle}>确认删除</Text>
        <Text style={styles.dialogText}>确定要删除这个项目吗？此操作不可撤销。</Text>
        <View style={styles.dialogButtons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => controller.close()}
          >
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={() => {
              controller.close();
              console.log('已确认删除');
            }}
          >
            <Text style={styles.buttonText}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.6,
        animationType: 'spring',
      }
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>确认对话框</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showConfirmDialog}>
        <Text style={styles.demoButtonText}>打开确认对话框</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 表单弹窗示例
 */
export function FormModalDemo() {
  const showFormModal = () => {
    const FormContent = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');

      return (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>用户信息</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>姓名</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入姓名"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>邮箱</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入邮箱"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => controller.close()}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                console.log('提交:', { name, email });
                controller.close();
              }}
            >
              <Text style={styles.buttonText}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const controller = Layer.showModal(<FormContent />, {
      backdrop: true,
      backdropOpacity: 0.5,
      animationType: 'spring',
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>表单弹窗</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showFormModal}>
        <Text style={styles.demoButtonText}>打开表单弹窗</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 内容弹窗示例（滚动内容）
 */
export function ContentModalDemo() {
  const showContentModal = () => {
    const controller = Layer.showModal(
      <View style={styles.contentContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.contentTitle}>使用条款</Text>
          <TouchableOpacity onPress={() => controller.close()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.contentText}>
            第一条 总则{'\n\n'}
            本协议是用户与本平台之间关于使用本服务所订立的协议。用户使用本服务即表示接受本协议的全部条款。
            {'\n\n'}
            第二条 服务内容{'\n\n'}
            本平台提供的服务内容包括但不限于：信息发布、数据存储、内容分享等功能。
            本平台有权根据实际情况随时调整或变更服务内容。
            {'\n\n'}
            第三条 用户义务{'\n\n'}
            用户在使用本服务时应遵守相关法律法规，不得利用本服务从事违法违规活动。
            用户应妥善保管账号信息，因用户自身原因造成的损失由用户自行承担。
            {'\n\n'}
            第四条 隐私保护{'\n\n'}
            本平台重视用户隐私保护，将采取合理措施保护用户个人信息安全。
            未经用户同意，本平台不会向第三方提供用户个人信息。
            {'\n\n'}
            第五条 免责声明{'\n\n'}
            因不可抗力或其他非本平台原因导致的服务中断、数据丢失等情况，本平台不承担责任。
            用户因使用本服务产生的任何直接或间接损失，本平台不承担赔偿责任。
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={[styles.primaryButton, styles.fullWidthButton]}
          onPress={() => controller.close()}
        >
          <Text style={styles.buttonText}>我已阅读并同意</Text>
        </TouchableOpacity>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>内容弹窗</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showContentModal}>
        <Text style={styles.demoButtonText}>打开内容弹窗</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 加载中弹窗示例
 */
export function LoadingModalDemo() {
  const showLoadingModal = () => {
    const controller = Layer.showModal(
      <View style={styles.loadingContainer}>
        <View style={styles.loadingSpinner}>
          <Text style={styles.loadingText}>⏳</Text>
        </View>
        <Text style={styles.loadingLabel}>加载中...</Text>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.7,
        animationType: 'spring',
        exclusive: true,
      }
    );

    // 3秒后自动关闭
    setTimeout(() => {
      controller.close();
    }, 3000);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>加载中弹窗</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showLoadingModal}>
        <Text style={styles.demoButtonText}>显示加载中</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 成功提示弹窗示例
 */
export function SuccessModalDemo() {
  const showSuccessModal = () => {
    const controller = Layer.showModal(
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.successTitle}>操作成功</Text>
        <Text style={styles.successText}>您的更改已保存</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => controller.close()}
        >
          <Text style={styles.buttonText}>好的</Text>
        </TouchableOpacity>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );

    // 2秒后自动关闭
    setTimeout(() => {
      controller.close();
    }, 2000);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>成功提示弹窗</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showSuccessModal}>
        <Text style={styles.demoButtonText}>显示成功提示</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 选择列表弹窗示例
 */
export function SelectListModalDemo() {
  const options = ['选项 1', '选项 2', '选项 3', '选项 4', '选项 5'];

  const showSelectModal = () => {
    const controller = Layer.showModal(
      <View style={styles.selectContainer}>
        <Text style={styles.selectTitle}>请选择一个选项</Text>
        <View style={styles.optionsList}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => {
                console.log('选择了:', option);
                controller.close();
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton, { marginTop: 12 }]}
          onPress={() => controller.close()}
        >
          <Text style={styles.cancelButtonText}>取消</Text>
        </TouchableOpacity>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>选择列表弹窗</Text>
      <TouchableOpacity style={styles.demoButton} onPress={showSelectModal}>
        <Text style={styles.demoButtonText}>打开选择列表</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  demoButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },

  // 基础弹窗样式
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },

  // 对话框样式
  dialogContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: 320,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  dialogText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  // 表单样式
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: 340,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },

  // 内容弹窗样式
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: 360,
    maxHeight: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  scrollContent: {
    maxHeight: 300,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },

  // 加载中样式
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 32,
  },
  loadingLabel: {
    fontSize: 16,
    color: '#666',
  },

  // 成功提示样式
  successContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: 280,
  },
  successIcon: {
    fontSize: 64,
    color: '#4CAF50',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },

  // 选择列表样式
  selectContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: 300,
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  optionsList: {
    marginBottom: 8,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },

  // 按钮样式
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  fullWidthButton: {
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
