import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useCartStore from '../store/cartStore';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="bg-surface/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-soft overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Nithyam Divyam Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <span className="hidden w-full h-full bg-primary text-white items-center justify-center text-xl">🌿</span>
            </div>
            <div>
              <span className="font-heading font-bold text-gray-800 text-lg leading-none block">Nithyam Divyam</span>
              <span className="text-xs text-secondary font-medium tracking-wider uppercase">Spices</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Cart + menu */}
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-fade-in">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-gray-100 px-4 py-4 space-y-2 animate-slide-up">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
