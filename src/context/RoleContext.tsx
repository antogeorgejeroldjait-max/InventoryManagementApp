// src/context/RoleContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../types/stock';

interface RoleContextType {
  userRole: 'user' | 'admin' | null;
  setUserRole: (role: 'user' | 'admin') => void;
  products: Product[];
  addProduct: (product: Product) => void;
  clearRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSetUserRole = useCallback((role: 'user' | 'admin') => {
    setUserRole(role);
  }, []);

  const handleAddProduct = useCallback((product: Product) => {
    setProducts((prev) => [product, ...prev]);
  }, []);

  const handleClearRole = useCallback(() => {
    setUserRole(null);
    setProducts([]);
  }, []);

  return (
    <RoleContext.Provider
      value={{
        userRole,
        setUserRole: handleSetUserRole,
        products,
        addProduct: handleAddProduct,
        clearRole: handleClearRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};
