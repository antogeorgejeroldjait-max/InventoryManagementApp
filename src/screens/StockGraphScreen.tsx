import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Stock } from '../types/stock';
import Svg, { Polyline } from 'react-native-svg';


interface Props {
  navigation: any;
  route: any;
}

// Simple Line Chart Mock Data
const generateChartData = () => {
  const data = [];
  let basePrice = 100;
  for (let i = 0; i < 30; i++) {
    basePrice += (Math.random() - 0.5) * 10;
    data.push({
      day: i,
      price: Math.max(basePrice, 50),
    });
  }
  return data;
};

export const StockGraphScreen: React.FC<Props> = ({ navigation, route }) => {
  const { stock } = route.params as { stock: Stock };
  const chartData = generateChartData();

  const maxPrice = Math.max(...chartData.map((d) => d.price));
  const minPrice = Math.min(...chartData.map((d) => d.price));
  const priceRange = maxPrice - minPrice;

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 48;
  const chartHeight = 300;
  const padding = 20;

  const getXPos = (index: number) => {
    return (index / (chartData.length - 1)) * (chartWidth - 2 * padding) + padding;
  };

  const getYPos = (price: number) => {
    return (
      chartHeight -
      ((price - minPrice) / priceRange) * (chartHeight - 2 * padding) -
      padding
    );
  };

  const points = chartData
    .map((d, i) => `${getXPos(i)},${getYPos(d.price)}`)
    .join(' ');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{stock.name}</Text>
          <Text style={styles.headerSubtitle}>{stock.company}</Text>
        </View>
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <View style={styles.priceLabels}>
          <Text style={styles.priceLabel}>${maxPrice.toFixed(2)}</Text>
          <Text style={styles.priceLabel}>
            ${((maxPrice + minPrice) / 2).toFixed(2)}
          </Text>
          <Text style={styles.priceLabel}>${minPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.chartWrapper}>
          <Svg
  width={chartWidth}
  height={chartHeight}
  style={styles.svg}
  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
>
  <Polyline
    points={points}
    fill="none"
    stroke="#f63b5dff"
    strokeWidth="2"
  />
</Svg>

        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={styles.statValue}>${maxPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={styles.statValue}>${minPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Current</Text>
          <Text style={styles.statValue}>${stock.price.toFixed(2)}</Text>
        </View>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cd0101ff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceLabels: {
    justifyContent: 'space-between',
    height: 300,
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  chartWrapper: {
    height: 20,
    justifyContent: 'center',
  },
  svg: {
    width: '100%',
    height: '100%',
    marginLeft: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    shadowColor: '#80b1f6ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  homeButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
