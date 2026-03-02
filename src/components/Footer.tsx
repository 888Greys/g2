import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, CreditCard, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-gray-800">
          <div className="flex items-start gap-4">
            <div className="bg-gray-800 p-3 rounded-xl text-blue-400">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Reliable & Safe</h4>
              <p className="text-sm text-gray-400">Over 10,000 games and software. Secure payments and instant delivery.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-gray-800 p-3 rounded-xl text-orange-400">
              <CreditCard size={32} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Secure Payments</h4>
              <p className="text-sm text-gray-400">200+ payment methods supported globally. Your data is always protected.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-gray-800 p-3 rounded-xl text-green-400">
              <HeadphonesIcon size={32} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-400">Our customer service team is available around the clock to help you.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 inline-block">
              <div className="bg-orange-500 text-white font-black text-2xl italic px-3 py-1 rounded-sm tracking-tighter inline-block">
                G2A
              </div>
              <span className="font-bold text-white text-xl tracking-tight">.COM</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              The fastest growing digital gaming marketplace. Buy and sell games, software, and gift cards at the best prices.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Marketplace</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog?category=games" className="hover:text-white transition-colors">Games</Link></li>
              <li><Link to="/catalog?category=software" className="hover:text-white transition-colors">Software</Link></li>
              <li><Link to="/catalog?category=gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link to="/catalog?category=subscriptions" className="hover:text-white transition-colors">Subscriptions</Link></li>
              <li><Link to="/catalog?sort=deals" className="hover:text-white transition-colors">Best Deals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/support" className="hover:text-white transition-colors">Support Center</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">How to Buy</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">How to Sell</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Stay Safe</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Affiliate Program</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800 text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} G2A Replica. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
