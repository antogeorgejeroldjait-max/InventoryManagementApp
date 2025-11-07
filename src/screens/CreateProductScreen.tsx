// src/screens/CreateProductScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRole } from '../context/RoleContext';
import { Product } from '../types/stock';

interface Props {
  navigation: any;
}

export const CreateProductScreen: React.FC<Props> = ({ navigation }) => {
  const { addProduct } = useRole();
  const [image, setImage] = useState<string | null>(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [percentage, setPercentage] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Needed', 'Camera permission required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateProduct = () => {
    if (!image || !id || !name || !company || !price || !percentage) {
      Alert.alert('Error', 'All fields required, including image');
      return;
    }

    setLoading(true);

    try {
      const newProduct: Product = {
        id: id.trim(),
        name: name.trim(),
        company: company.trim(),
        Price: parseFloat(price),
        percentage: parseFloat(percentage),
        image: image,
        createdAt: new Date().toISOString(),
      };

      addProduct(newProduct);

      Alert.alert('Success', 'Product created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);

      // Reset form
      setImage(null);
      setId('');
      setName('');
      setCompany('');
      setPrice('');
      setPercentage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Product</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.content}>
            {/* Image Picker */}
            <View style={styles.imageSection}>
              <Text style={styles.sectionTitle}>Product Image</Text>
              {image ? (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setImage(null)}
                  >
                    <Ionicons name="close-circle" size={32} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={48} color="#9ca3af" />
                  <Text style={styles.placeholderText}>No Image Selected</Text>
                </View>
              )}

              {/* Image Options */}
              <View style={styles.imageButtonsContainer}>
                <TouchableOpacity
                  style={[styles.imageButton, styles.primaryButton]}
                  onPress={pickImage}
                >
                  <Ionicons name="image" size={18} color="#fff" />
                  <Text style={styles.imageButtonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.imageButton, styles.secondaryButton]}
                  onPress={takePhoto}
                >
                  <Ionicons name="camera" size={18} color="#3b82f6" />
                  <Text style={[styles.imageButtonText, { color: '#3b82f6' }]}>
                    Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Product Details</Text>

              {/* ID Field */}
              {/* <View style={styles.inputContainer}>
                <Text style={styles.label}>Product ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., STOCK001"
                  placeholderTextColor="#9ca3af"
                  value={id}
                  onChangeText={setId}
                  editable={!loading}
                />
              </View> */}

              {/* Stock Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Stock Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Tech Stock"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                  editable={!loading}
                />
              </View>

              {/* Company Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Company Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Tech Company Inc"
                  placeholderTextColor="#9ca3af"
                  value={company}
                  onChangeText={setCompany}
                  editable={!loading}
                />
              </View>

              {/* Current Price */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Price (₹)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 1500.00"
                  placeholderTextColor="#9ca3af"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                  editable={!loading}
                />
              </View>

              {/* Stock % */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Percentage (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 5.25"
                  placeholderTextColor="#9ca3af"
                  value={percentage}
                  onChangeText={setPercentage}
                  keyboardType="decimal-pad"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleCreateProduct}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Creating...' : 'Create Product'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  imageSection: {
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 8,
    color: '#9ca3af',
    fontSize: 14,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  submitButton: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
