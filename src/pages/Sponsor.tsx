
import React from 'react';
import Layout from '../components/Layout';
import { Mail } from 'lucide-react';

const Sponsor = () => {
  return (
    <Layout>
      <div className="p-4 md:p-8 space-y-12">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Sponsorship & Support
            </h1>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Fuel DPIcon's AI Galaxy
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We're DPIcon, a constellation of AI dreamers, and we're building a universe where creativity knows no bounds. 
                But every star needs a spark—your sponsorship keeps our engines humming, our tools evolving, and our community 
                thriving. Toss a comet our way, and snag exclusive goodies while you're at it!
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Invest in the Future of AI Creativity
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                At DPIcon, we're pioneering the next generation of artificial intelligence tools, empowering individuals 
                and businesses to transform ideas into stunning visual realities. Your support plays a vital role in 
                advancing our mission—enhancing our platform, expanding accessibility, and fostering a thriving creative 
                community. Whether you're an individual, a corporation, or an organization, partnering with us offers a 
                unique opportunity to contribute to cutting-edge AI innovation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                How Your Support Makes a Difference
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We welcome contributions of all sizes—each one fuels our ability to innovate and grow. Rather than 
                offering predefined plans, we tailor our sponsorship opportunities to suit your goals. Whether you're 
                looking to support as an individual advocate or establish a corporate partnership, your involvement 
                directly enhances our platform's capabilities and reach. This is an investment in creativity, 
                technology, and the future.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                How to Get Involved
              </h2>
              <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                <p>
                  <strong className="text-white">Contact Us:</strong> Reach out to our team at support@dpicon.com to 
                  discuss your interest in supporting DPIcon.
                </p>
                <p>
                  <strong className="text-white">Explore Opportunities:</strong> We'll work with you to identify a 
                  collaboration that aligns with your vision.
                </p>
                <p>
                  <strong className="text-white">Make an Impact:</strong> Your support will be implemented to drive 
                  meaningful advancements in our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Questions or Assistance?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our dedicated support team is available to assist you at any time. For inquiries about sponsorship, 
                technical support, general feedback, please email us at support@dpicon.com. We value your input and 
                are committed to building partnerships that benefits both our community and your objectives.
              </p>
            </section>

            {/* Thank You Section */}
            <section className="text-center bg-gradient-to-r from-purple-900/20 to-purple-700/20 rounded-xl p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Thank You for Supporting Our Vision ❤️
              </h2>
              <a
                href="mailto:support@dpicon.com"
                className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Mail size={20} />
                Contact Us
              </a>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sponsor;
