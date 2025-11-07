// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StockCard } from '../components/StockCard';
import { Stock } from '../types/stock';

interface Props {
  navigation: any;
}

const ALL_STOCKS: Stock[] = [
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
    id: '5',
    name: 'Pharma Stock',
    company: 'Cipla Ltd',
    price: 1200.0,
    change: 4.5,
    image: require('../../assets/tesla.jpg'),
  },
  {
    id: '6',
    name: 'IT Stock',
    company: 'TCS',
    price: 3500.25,
    change: -1.8,
    image: require('../../assets/tesla.jpg'),
  },
];

type FilterTab = 'all' | 'gainers' | 'losers' | 'trending';

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<'price' | 'change'>('price');

  // Filter stocks based on search and tab
  const getFilteredStocks = (): Stock[] => {
    let filtered = ALL_STOCKS;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (stock) =>
          stock.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tab filter
    if (activeTab === 'gainers') {
      filtered = filtered.filter((stock) => stock.change >= 0);
    } else if (activeTab === 'losers') {
      filtered = filtered.filter((stock) => stock.change < 0);
    } else if (activeTab === 'trending') {
      filtered = filtered.filter((stock) => Math.abs(stock.change) >= 2);
    }

    // Sort
    if (sortBy === 'price') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'change') {
      filtered.sort((a, b) => b.change - a.change);
    }

    return filtered;
  };

  const filteredStocks = getFilteredStocks();

  const handleCardPress = (stock: Stock) => {
    navigation.navigate('CartDetails', { stock });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Stocks</Text>
        <Text style={styles.headerSubtitle}>Find & Trade Stocks</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search stocks..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {(['all', 'gainers', 'losers', 'trending'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'price' && styles.activeSortButton,
            ]}
            onPress={() => setSortBy('price')}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === 'price' && styles.activeSortButtonText,
              ]}
            >
              💰 Price
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'change' && styles.activeSortButton,
            ]}
            onPress={() => setSortBy('change')}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === 'change' && styles.activeSortButtonText,
              ]}
            >
              📈 Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stocks List */}
      {filteredStocks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={60} color="#d1d5db" />
          <Text style={styles.emptyText}>No stocks found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery
              ? 'Try searching with different keywords'
              : 'Select a filter to see stocks'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StockCard stock={item} onPress={handleCardPress} />
          )}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginTop: StatusBar.currentHeight || 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    height: 10,
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 8,
    height: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    height: 10,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 10,
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  activeSortButton: {
    backgroundColor: '#dbeafe',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeSortButtonText: {
    color: '#3b82f6',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
});
