import * as ImagePicker from 'expo-image-picker';

export async function tomarFoto() {
  return ImagePicker.launchCameraAsync({
    mediaTypes: ['images'], 
    quality: 0.8,
    allowsEditing: false,
  });
}
