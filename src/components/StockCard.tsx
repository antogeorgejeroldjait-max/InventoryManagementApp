// src/components/StockCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stock } from '../types/stock';

interface Props {
  stock: Stock;
  onPress: (stock: Stock) => void;
}

export const StockCard: React.FC<Props> = ({ stock, onPress }) => {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? '#10b981' : '#ef4444';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(stock)}
      activeOpacity={0.8}
    >
      {/* Image */}
      <Image source={stock.image} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.company} numberOfLines={1}>
            {stock.company}
          </Text>
          <Text style={styles.stockName} numberOfLines={1}>
            {stock.name}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <Text style={styles.price}>₹{stock.price.toFixed(2)}</Text>
          <View
            style={[
              styles.changeBadge,
              isPositive ? styles.positiveBadge : styles.negativeBadge,
            ]}
          >
            <Ionicons
              name={isPositive ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={changeColor}
            />
            <Text style={[styles.change, { color: changeColor }]}>
              {stock.change > 0 ? '+' : ''}
              {stock.change.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  company: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  stockName: {
    fontSize: 12,
    color: '#6b7280',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  changeBadge: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
  },
  positiveBadge: {
    backgroundColor: '#d1fae5',
  },
  negativeBadge: {
    backgroundColor: '#fee2e2',
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
});
