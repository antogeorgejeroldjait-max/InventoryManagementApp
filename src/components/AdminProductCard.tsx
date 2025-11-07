// src/components/AdminProductCard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/stock';

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export const AdminProductCard: React.FC<Props> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const isPositive = product.percentage >= 0;

  const handleDelete = () => {
    Alert.alert('Delete Product', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => onDelete(product.id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.card}>
      {/* Image + Details */}
      <View style={styles.contentContainer}>
        {product.image && (
          <Image source={{ uri: product.image }} style={styles.image} />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.company}>{product.company}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.Price.toFixed(2)}</Text>
            <Text
              style={[
                styles.percentage,
                isPositive ? styles.positiveText : styles.negativeText,
              ]}
            >
              {isPositive ? '+' : ''}{product.percentage.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={onEdit}
        >
          <Ionicons name="pencil" size={16} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  positiveText: {
    color: '#10b981',
  },
  negativeText: {
    color: '#ef4444',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#dbeafe',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
});
