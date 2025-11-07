import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';

interface Transaction {
  id: string;
  stockName: string;
  company: string;
  quantity: number;
  price: number;
  totalAmount: number;
  date: string;
  type: 'buy' | 'sell';
}

export const TransactionHistoryScreen: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      stockName: 'AAPL',
      company: 'Apple Inc',
      quantity: 5,
      price: 150.25,
      totalAmount: 751.25,
      date: '2025-11-06',
      type: 'buy',
    },
    {
      id: '2',
      stockName: 'GOOGL',
      company: 'Alphabet Inc',
      quantity: 3,
      price: 140.80,
      totalAmount: 422.40,
      date: '2025-11-05',
      type: 'buy',
    },
    {
      id: '3',
      stockName: 'MSFT',
      company: 'Microsoft Corp',
      quantity: 2,
      price: 380.45,
      totalAmount: 760.90,
      date: '2025-11-04',
      type: 'sell',
    },
    {
      id: '4',
      stockName: 'AMZN',
      company: 'Amazon.com Inc',
      quantity: 4,
      price: 170.30,
      totalAmount: 681.20,
      date: '2025-11-03',
      type: 'buy',
    },
    {
      id: '5',
      stockName: 'NVDA',
      company: 'NVIDIA Corporation',
      quantity: 1,
      price: 875.00,
      totalAmount: 875.00,
      date: '2025-11-02',
      type: 'buy',
    },
    {
      id: '6',
      stockName: 'TSLA',
      company: 'Tesla Inc',
      quantity: 3,
      price: 242.80,
      totalAmount: 728.40,
      date: '2025-11-01',
      type: 'sell',
    },
  ]);

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const typeColor = item.type === 'buy' ? '#22c55e' : '#ef4444';
    const typeLabel = item.type === 'buy' ? 'BUY' : 'SELL';
    const typeIcon = item.type === 'buy' ? '↓' : '↑';

    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionInfo}>
            <View
              style={[styles.typeIcon, { backgroundColor: typeColor + '20' }]}
            >
              <Text style={[styles.typeIconText, { color: typeColor }]}>
                {typeIcon}
              </Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.stockName}>{item.stockName}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          <View style={styles.transactionAmount}>
            <Text style={[styles.amount, { color: typeColor }]}>
              {item.type === 'buy' ? '+' : '-'}${item.totalAmount.toFixed(2)}
            </Text>
            <Text style={styles.type}>{typeLabel}</Text>
          </View>
        </View>
        <View style={styles.transactionFooter}>
          <Text style={styles.quantity}>
            {item.quantity} shares @ ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <Text style={styles.headerSubtitle}>Your stock transactions</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  typeIconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  transactionDetails: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  company: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  type: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
  transactionFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quantity: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
});
