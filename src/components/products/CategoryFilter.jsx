import { CATEGORIES } from '../../data/products';
import './CategoryFilter.css';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="cat-filter">
      <button
        className={`cat-filter__btn ${active === 'all' ? 'active' : ''}`}
        onClick={() => onChange('all')}
      >
        <span className="cfb-icon">🛒</span>
        All Products
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          className={`cat-filter__btn ${active === cat.id ? 'active' : ''}`}
          onClick={() => onChange(cat.id)}
        >
          <span className="cfb-icon">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
