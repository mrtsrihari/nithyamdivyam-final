import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden">
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
              <span className="font-heading font-bold text-white text-lg leading-none block">Nithyam Divyam</span>
              <span className="text-xs text-secondary uppercase tracking-wider">Spices</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Pure, organic spices sourced directly from the lush estates of Kajanaparai. 
            Nature's finest, delivered to your kitchen.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-gray-400 hover:text-secondary transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4 text-lg">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Kajanaparai, Tamil Nadu, India</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+917306807443" className="hover:text-secondary transition-colors">+91 7306807443</a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:nithyamdivyam07@gmail.com" className="hover:text-secondary transition-colors text-xs">nithyamdivyam07@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📸</span>
              <a href="https://www.instagram.com/nd._.spices/" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">@nd._.spices</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Nithyam Divyam Spices. All rights reserved.</p>
        <p className="text-xs text-gray-500">Founder: Ayyappan S S &nbsp;|&nbsp; CEO: Yugesh Kumar S A</p>
      </div>
    </div>
  </footer>
);

export default Footer;
