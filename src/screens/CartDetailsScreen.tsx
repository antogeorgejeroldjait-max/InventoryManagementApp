import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Stock } from '../types/stock';

interface Props {
  navigation: any;
  route: any;
}

export const CartDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { stock } = route.params as { stock: Stock };
  const changeColor = stock.change >= 0 ? '#22c55e' : '#ef4444';

  const handleGoToStock = () => {
    navigation.navigate('StockGraph', { stock });
  };

  const handleGoToPayment = () => {
    navigation.navigate('Payment', { stock });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Large Image */}
      <View style={styles.imageContainer}>
        <Image source={stock.image} style={styles.largeImage} />
      </View>

      {/* Stock Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.stockSymbol}>{stock.name}</Text>
        <Text style={styles.company}>{stock.company}</Text>

        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Current Price</Text>
          <Text style={[styles.price, { color: changeColor }]}>
            ${stock.price.toFixed(2)}
          </Text>
        </View>

        <View style={styles.changeSection}>
          <Text style={styles.changeLabel}>24h Change</Text>
          <Text style={[styles.change, { color: changeColor }]}>
            {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* Two Buttons Side by Side */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.stockButton}
          onPress={handleGoToStock}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Go to Stock Graph</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handleGoToPayment}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    marginTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  largeImage: {
    width: 340,
    height: 220,
    borderRadius: 12,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stockSymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  priceSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  priceLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
  },
  changeSection: {
    paddingTop: 4,
  },
  changeLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
    marginBottom: 4,
  },
  change: {
    fontSize: 18,
    fontWeight: '600',
  },
  // New Styles for Two Buttons Side by Side
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  stockButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  paymentButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
