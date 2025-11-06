import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Stock } from '../types/stock';

interface Props {
  stock: Stock;
  onPress: (stock: Stock) => void;
}

export const StockCard: React.FC<Props> = ({ stock, onPress }) => {
  const changeColor = stock.change >= 0 ? '#22c55e' : '#ef4444';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(stock)}
      activeOpacity={0.7}
    >
      <Image source={stock.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.company} numberOfLines={1}>
          {stock.company}
        </Text>
        <Text style={[styles.price, { color: changeColor }]}>
          ${stock.price.toFixed(2)}
        </Text>
        <Text style={[styles.change, { color: changeColor }]}>
          {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  company: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
  },
});
