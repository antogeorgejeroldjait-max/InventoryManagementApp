// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stock } from '../types/stock';

interface Props {
  navigation: any;
}

const STOCKS_DATA: Stock[] = [
  {
    id: '1',
    name: 'Tech Stock',
    company: 'Apple Inc',
    price: 1500.5,
    change: 5.25,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '2',
    name: 'Energy Stock',
    company: 'Shell Energy',
    price: 2300.0,
    change: -2.15,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '3',
    name: 'Finance Stock',
    company: 'ICICI Bank',
    price: 950.75,
    change: 3.5,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '4',
    name: 'Auto Stock',
    company: 'Maruti Suzuki',
    price: 8200.0,
    change: 1.2,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '1',
    name: 'AAPL',
    company: 'Apple Inc',
    price: 150.25,
    change: 2.5,
    image: require('../../assets/apple.jpg'),
  },
  {
    id: '2',
    name: 'GOOGL',
    company: 'Alphabet Inc',
    price: 140.80,
    change: -1.2,
    image: require('../../assets/google.jpg'),
  },
  {
    id: '3',
    name: 'MSFT',
    company: 'Microsoft Corp',
    price: 380.45,
    change: 3.1,
    image: require('../../assets/microsoft.jpg'),
  },
  {
    id: '4',
    name: 'AMZN',
    company: 'Amazon.com Inc',
    price: 170.30,
    change: -0.8,
    image: require('../../assets/amazon.jpg'),
  },
  {
    id: '5',
    name: 'NVDA',
    company: 'NVIDIA Corporation',
    price: 875.00,
    change: 5.2,
    image: require('../../assets/nvidia.jpg'),
  },
  {
    id: '6',
    name: 'TSLA',
    company: 'Tesla Inc',
    price: 242.80,
    change: -2.3,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '7',
    name: 'META',
    company: 'Meta Platforms',
    price: 498.75,
    change: 1.8,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '8',
    name: 'NFLX',
    company: 'Netflix Inc',
    price: 280.15,
    change: 4.5,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '9',
    name: 'ADBE',
    company: 'Adobe Inc',
    price: 425.60,
    change: -1.9,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '10',
    name: 'INTC',
    company: 'Intel Corporation',
    price: 95.30,
    change: 2.1,
    image: require('../../assets/tesla.jpg'),
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [watchlist, setWatchlist] = useState<Stock[]>(STOCKS_DATA.slice(0, 2));
  const [portfolio, setPortfolio] = useState<{ stock: Stock; quantity: number }[]>([
{ stock: STOCKS_DATA[0], quantity: 5 },
{ stock: STOCKS_DATA[0], quantity: 3 }
  ]);

  // Portfolio Value Calculate Pannum
  const portfolioValue = portfolio.reduce(
    (sum, item) => sum + item.stock.price * item.quantity,
    0
  );
  const portfolioChange = portfolio.reduce(
    (sum, item) => sum + (item.stock.change * item.stock.price * item.quantity) / 100,
    0
  );

  const handleCardPress = (stock: Stock) => {
    navigation.navigate('CartDetails', { stock });
  };

  const handleAddToWatchlist = (stock: Stock) => {
    if (!watchlist.find((s) => s.id === stock.id)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Vanakkam! 👋</Text>
            <Text style={styles.date}>Friday, Nov 07, 2025</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => console.log('Notifications')}
          >
            <Ionicons name="notifications" size={24} color="#1f2937" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Portfolio Card - Main Stats */}
        <View style={styles.portfolioCard}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Your Portfolio</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
              <Ionicons name="settings" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          {/* Portfolio Value */}
          <View style={styles.portfolioValue}>
            <Text style={styles.portfolioLabel}>Total Value</Text>
            <Text style={styles.portfolioAmount}>
              ₹{portfolioValue.toFixed(2)}
            </Text>
          </View>

          {/* Portfolio Change */}
          <View style={styles.portfolioChangeContainer}>
            <View
              style={[
                styles.changeBadge,
                portfolioChange >= 0
                  ? styles.positiveChange
                  : styles.negativeChange,
              ]}
            >
              <Ionicons
                name={portfolioChange >= 0 ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={portfolioChange >= 0 ? '#10b981' : '#ef4444'}
              />
              <Text
                style={[
                  styles.changeText,
                  {
                    color:
                      portfolioChange >= 0 ? '#10b981' : '#ef4444',
                  },
                ]}
              >
                {portfolioChange >= 0 ? '+' : ''}
                {portfolioChange.toFixed(2)} ({((portfolioChange / portfolioValue) * 100).toFixed(2)}%)
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('TransactionHistory')}
            >
              <Text style={styles.viewButtonText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Portfolio Items */}
          <View style={styles.portfolioItems}>
            {portfolio.map((item, index) => (
              <View key={index} style={styles.portfolioItem}>
                <View>
                  <Text style={styles.stockName}>{item.stock.company}</Text>
                  <Text style={styles.quantity}>
                    {item.quantity} shares @ ₹{item.stock.price.toFixed(2)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.itemValue,
                    {
                      color:
                        item.stock.change >= 0 ? '#10b981' : '#ef4444',
                    },
                  ]}
                >
                  ₹{(item.stock.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.buyButton]}
            onPress={() => navigation.navigate('CartDetails', { stock: STOCKS_DATA })}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.actionText}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.sellButton]}
            onPress={() => console.log('Sell')}
          >
            <Ionicons name="remove-circle" size={24} color="#fff" />
            <Text style={styles.actionText}>Sell</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.transferButton]}
            onPress={() => console.log('Transfer')}
          >
            <Ionicons name="swap-horizontal" size={24} color="#fff" />
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.moreButton]}
            onPress={() => console.log('More')}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            <Text style={styles.actionText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Watchlist Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Watchlist</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.watchlistContainer}>
            {watchlist.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="heart-outline" size={40} color="#d1d5db" />
                <Text style={styles.emptyText}>No watchlist items</Text>
              </View>
            ) : (
              watchlist.map((stock) => (
                <TouchableOpacity
                  key={stock.id}
                  style={styles.watchlistCard}
                  onPress={() => handleCardPress(stock)}
                >
                  <View style={styles.watchlistInfo}>
                    <Text style={styles.watchlistName}>{stock.company}</Text>
                    <Text style={styles.watchlistPrice}>₹{stock.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.watchlistChange}>
                    <Ionicons
                      name={stock.change >= 0 ? 'arrow-up' : 'arrow-down'}
                      size={14}
                      color={stock.change >= 0 ? '#10b981' : '#ef4444'}
                    />
                    <Text
                      style={[
                        styles.changePercent,
                        {
                          color: stock.change >= 0 ? '#10b981' : '#ef4444',
                        },
                      ]}
                    >
                      {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        {/* Top Gainers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🚀 Top Gainers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          {STOCKS_DATA.slice(0, 2).map((stock) => (
            <TouchableOpacity
              key={stock.id}
              style={styles.stockCard}
              onPress={() => handleCardPress(stock)}
            >
              <View style={styles.stockCardLeft}>
                <Text style={styles.stockCardCompany}>{stock.company}</Text>
                <Text style={styles.stockCardName}>{stock.name}</Text>
              </View>
              <View style={styles.stockCardRight}>
                <Text style={styles.stockCardPrice}>₹{stock.price.toFixed(2)}</Text>
                <Text
                  style={[
                    styles.stockCardChange,
                    {
                      color: stock.change >= 0 ? '#10b981' : '#ef4444',
                    },
                  ]}
                >
                  {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  portfolioCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  portfolioValue: {
    marginBottom: 12,
  },
  portfolioLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  portfolioAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
  },
  portfolioChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  changeBadge: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  positiveChange: {
    backgroundColor: '#d1fae5',
  },
  negativeChange: {
    backgroundColor: '#fee2e2',
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#dbeafe',
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
  },
  portfolioItems: {
    gap: 10,
  },
  portfolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  stockName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  quantity: {
    fontSize: 12,
    color: '#6b7280',
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buyButton: {
    backgroundColor: '#3b82f6',
  },
  sellButton: {
    backgroundColor: '#ef4444',
  },
  transferButton: {
    backgroundColor: '#10b981',
  },
  moreButton: {
    backgroundColor: '#f59e0b',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  watchlistContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 8,
    color: '#9ca3af',
    fontSize: 14,
  },
  watchlistCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  watchlistInfo: {
    flex: 1,
  },
  watchlistName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  watchlistPrice: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  watchlistChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changePercent: {
    fontSize: 12,
    fontWeight: '600',
  },
  stockCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  stockCardLeft: {
    flex: 1,
  },
  stockCardCompany: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  stockCardName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  stockCardRight: {
    alignItems: 'flex-end',
  },
  stockCardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  stockCardChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
