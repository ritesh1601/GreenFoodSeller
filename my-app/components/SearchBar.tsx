// Search Component
import {Search} from "lucide-react";
const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
            <div className="relative max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search for fresh fruits, vegetables, and more..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-4 pl-12 pr-4 text-lg border border-green-200 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-400 transition-all duration-300 placeholder-gray-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-green-400" />
                <button
                    onClick={onSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition-colors shadow-md"
                >
                    Search
                </button>
            </div>
        </div>
    );
};
export default SearchBar;
