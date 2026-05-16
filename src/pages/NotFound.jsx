import { Link } from 'react-router-dom';
import './NotFound.css';


export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="nf-inner">
        
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Page Not Found</h2>
        <p className="nf-sub">Looks like this page got lost in the spice cabinet. Let's get you back.</p>
        <div className="nf-actions">
          <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
          <Link to="/products" className="btn btn-outline btn-lg">Browse Products</Link>
        </div>
      </div>
    </div>
  );
}
