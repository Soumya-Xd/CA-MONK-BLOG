const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b0f1a] to-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-white text-black font-bold flex items-center justify-center rounded">
                CA
              </div>
              <span className="text-white font-semibold text-lg">
                CA MONK
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation of financial leaders with tools,
              community, and knowledge.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Webinars</li>
              <li className="hover:text-white cursor-pointer">Case Studies</li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">PLATFORM</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Job Board</li>
              <li className="hover:text-white cursor-pointer">Practice Tests</li>
              <li className="hover:text-white cursor-pointer">Mentorship</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">CONNECT</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">LinkedIn</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
              <li className="hover:text-white cursor-pointer">Instagram</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2024 CA Monk. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
