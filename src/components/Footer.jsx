import { Link } from 'react-router-dom';
import { FaTint } from 'react-icons/fa';
import { FaFacebook, FaXTwitter, FaInstagram, FaPhone } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaTint className="text-primary-500 text-2xl" />
            <span className="font-heading text-xl font-semibold text-white">Lifeline</span>
          </div>
          <p className="text-sm text-gray-400">
            Every drop counts. We connect willing donors with people who need blood, turning
            small acts of kindness into second chances at life.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary-400">Home</Link></li>
            <li><Link to="/search" className="hover:text-primary-400">Search Donors</Link></li>
            <li><Link to="/blood-donation-requests" className="hover:text-primary-400">Donation Requests</Link></li>
            <li><Link to="/register" className="hover:text-primary-400">Become a Donor</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhone className="text-primary-500" /> +880 1XXX-XXXXXX</li>
            <li>support@lifeline.org</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary-400"><FaFacebook /></a>
            <a href="#" className="hover:text-primary-400"><FaXTwitter /></a>
            <a href="#" className="hover:text-primary-400"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lifeline Blood Donation Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
