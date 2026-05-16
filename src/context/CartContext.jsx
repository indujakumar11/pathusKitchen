import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);

function loadCart() {
  try {
    const saved = localStorage.getItem('pk_cart');
    if (!saved) return [];
    const items = JSON.parse(saved);
    return items.filter(item =>
      item.cartId && item.id && item.name && item.price > 0 &&
      PRODUCTS.some(p => p.id === item.id)
    );
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCart(),
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.cartId === action.payload.cartId);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartId === action.payload.cartId ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map(i => i.cartId === action.payload.cartId ? { ...i, qty: action.payload.qty } : i)
          .filter(i => i.qty > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback((product, selectedQuantity) => {
    const cartId = `${product.id}-${selectedQuantity}`;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        cartId,
        name: product.name,
        image: product.image,
        selectedQuantity,
        price: product.prices[selectedQuantity],
      },
    });
  }, []);

  const removeFromCart = (cartId) => dispatch({ type: 'REMOVE_ITEM', payload: cartId });
  const updateQty = (cartId, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  /* Persist cart items to localStorage on every change */
  useEffect(() => {
    try { localStorage.setItem('pk_cart', JSON.stringify(state.items)); } catch {}
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
