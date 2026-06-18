import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaHandHoldingHeart, FaUserFriends, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const stats = [
  { label: 'Registered Donors', value: '4,200+' },
  { label: 'Lives Touched', value: '9,500+' },
  { label: 'Districts Covered', value: '64' },
];

const steps = [
  {
    icon: <FaUserFriends className="text-3xl text-primary-600" />,
    title: 'Become a Donor',
    desc: 'Create your profile in minutes with your blood group and location, so people nearby can find you when it matters.',
  },
  {
    icon: <FaHeartbeat className="text-3xl text-primary-600" />,
    title: 'Find a Request',
    desc: 'Browse open donation requests near you, or post your own when someone you love needs blood urgently.',
  },
  {
    icon: <FaHandHoldingHeart className="text-3xl text-primary-600" />,
    title: 'Give the Gift of Life',
    desc: 'Confirm your donation and walk away knowing that one small act just gave someone a second chance.',
  },
];

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush via-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
              A drop of yours <span className="text-primary-600 italic">can be</span> someone's
              lifetime.
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              Lifeline connects willing blood donors across Bangladesh with patients and
              families in urgent need — turning a simple act of kindness into a second chance
              at life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 text-white px-7 py-3 rounded-full font-medium shadow-soft transition-colors"
              >
                Join as a donor
              </Link>
              <Link
                to="/search"
                className="bg-white border border-primary-200 hover:border-primary-400 text-primary-700 px-7 py-3 rounded-full font-medium transition-colors"
              >
                Search Donors
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=900&q=80"
              alt="A donor giving blood at a donation drive"
              className="rounded-3xl shadow-soft w-full h-[420px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft p-4 flex items-center gap-3">
              <FaHeartbeat className="text-primary-600 text-2xl" />
              <div>
                <p className="font-semibold text-gray-800">Every 2 seconds</p>
                <p className="text-xs text-gray-500">someone needs blood</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-soft grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-blush">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-6">
              <p className="text-3xl font-heading font-semibold text-primary-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">How Lifeline Works</h2>
          <p className="text-gray-600 mt-3">
            Three simple steps stand between a person in need and the gift of life.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-soft border border-blush text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-blush flex items-center justify-center mb-5">
                {step.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emotional story section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80"
            alt="Hands joined together symbolizing care and community support"
            className="rounded-3xl w-full h-[360px] object-cover"
          />
          <div>
            <h2 className="font-heading text-3xl font-semibold mb-4">
              Behind every request, there's a story.
            </h2>
            <p className="text-gray-300 leading-relaxed">
              A father waiting outside an operation theatre. A mother praying for her newborn.
              A friend driving across the city at midnight to find a matching blood group.
              These are the moments Lifeline was built for — to shorten the distance between a
              request and a willing heart, so no family has to face that wait alone.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Have a question, partnership idea, or feedback? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-primary-600" /> +880 1XXX-XXXXXX
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-primary-600" /> support@lifeline.org
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white rounded-2xl shadow-soft border border-blush p-8 space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
