/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { GameCard } from "./components/GameCard";
import { Footer } from "./components/Footer";
import { games } from "./data/games";

export default function App() {
  const trendingGames = games.filter(g => g.isTrending).slice(0, 5);
  const bestsellers = games.filter(g => g.isBestseller).slice(0, 5);
  const newReleases = games.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      
      <main>
        <Hero />
        
        <Section 
          title="Trending Now" 
          subtitle="The most popular games everyone is playing right now."
          actionText="View all trending"
          className="bg-white"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {trendingGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </Section>

        <Section 
          title="Bestsellers" 
          subtitle="Top-selling games, software, and gift cards."
          actionText="View all bestsellers"
          className="bg-gray-50"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {bestsellers.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </Section>

        {/* Promo Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/promo/1200/400')] opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                  <span className="text-orange-400">G2A</span> PLUS
                </h3>
                <p className="text-blue-100 text-lg max-w-md">
                  Get up to 10% extra discount on every purchase, free games monthly, and priority support.
                </p>
              </div>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 whitespace-nowrap">
                Join Now for $1.99/mo
              </button>
            </div>
          </div>
        </div>

        <Section 
          title="New Releases" 
          subtitle="Fresh titles just added to our catalog."
          actionText="View all new releases"
          className="bg-white"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {newReleases.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </Section>
        
      </main>

      <Footer />
    </div>
  );
}
