import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton, useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

type ImagePreviewModalProps = {
  visible: boolean;
  imageUri?: string;
  onClose: () => void;
};

export function ImagePreviewModal({ visible, imageUri, onClose }: ImagePreviewModalProps) {
  const theme = useTheme<ThemeType>();

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.header}>
          <IconButton
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="close" color={color} size={size} />
            )}
            iconColor={theme.colors.textPrimary}
            containerColor="rgba(124,58,237,0.3)"
            onPress={onClose}
          />
        </View>
        {imageUri ? <Image source={imageUri} style={styles.image} contentFit="contain" /> : null}
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 44,
    right: 8,
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '80%',
  },
});
