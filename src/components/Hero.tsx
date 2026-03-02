import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/gaminghero/1920/600"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Main Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold mb-6 border border-orange-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            WEEKEND DEALS
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Level up your library <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              for less.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
            Discover thousands of digital games, software, and gift cards at unbeatable prices. Instant delivery, 24/7 support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
              Shop Bestsellers
              <ChevronRight size={20} />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center">
              View All Offers
            </button>
          </div>
        </div>

        {/* Featured Deal Card */}
        <div className="hidden md:block w-full max-w-md relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-md shadow-lg">
              -34%
            </div>
            <img 
              src="https://picsum.photos/seed/dragonsdogma/800/400" 
              alt="Featured Game" 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-gray-400 bg-gray-700 px-2 py-1 rounded">STEAM</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Dragon's Dogma 2</h3>
              <div className="flex items-end gap-3 mt-4">
                <span className="text-3xl font-black text-orange-400">$45.99</span>
                <span className="text-lg text-gray-500 line-through mb-1">$69.99</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
