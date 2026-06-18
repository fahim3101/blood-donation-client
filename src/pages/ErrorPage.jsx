import { Link } from 'react-router-dom';
import { FaTint } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blush via-cream to-white text-center">
      <FaTint className="text-primary-600 text-6xl mb-6" />
      <h1 className="font-heading text-5xl font-semibold text-gray-900 mb-3">404</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for has wandered off. Let's get you back to where lives are saved.
      </p>
      <Link
        to="/"
        className="bg-primary-600 hover:bg-primary-700 text-white px-7 py-3 rounded-full font-medium transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
