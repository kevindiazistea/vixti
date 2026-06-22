import * as ImagePicker from 'expo-image-picker';

export async function seleccionarDeGaleria() {
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.8,
    allowsEditing: false,
  });
}
