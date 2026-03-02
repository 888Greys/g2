import { Game } from "../data/games";
import { ShoppingCart, Heart, ShieldCheck } from "lucide-react";

interface GameCardProps {
  key?: string | number;
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 relative cursor-pointer">
      {/* Discount Badge */}
      {game.discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          -{game.discount}%
        </div>
      )}
      
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={game.coverUrl} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button className="bg-white p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors text-gray-700">
            <ShoppingCart size={20} />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors text-gray-700">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">
            {game.platform}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
          {game.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <ShieldCheck size={14} className="text-green-500" />
            <span>{game.seller}</span>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${game.currentPrice.toFixed(2)}
            </span>
            {game.originalPrice > game.currentPrice && (
              <span className="text-sm text-gray-400 line-through mb-0.5">
                ${game.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
