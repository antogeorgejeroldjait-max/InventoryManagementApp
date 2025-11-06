import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StockCard } from '../components/StockCard';
import { MOCK_STOCKS } from '../data/stocks';
import { Stock } from '../types/stock';

interface Props {
  navigation: any;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleCardPress = (stock: Stock) => {
    navigation.navigate('CartDetails', { stock });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stock Market</Text>
        <Text style={styles.headerSubtitle}>Real-time Updates</Text>
      </View>
      <FlatList
        data={MOCK_STOCKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StockCard stock={item} onPress={handleCardPress} />
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
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
});
