import React, { useState, useMemo } from 'react';
import { MEDICINES_DATABASE, MEDICINE_CATEGORIES } from '../data';
import { Medicine } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface SearchCatalogProps {
  onSelectMedicineForOrder: (medicineName: string) => void;
  darkMode: boolean;
}

export default function SearchCatalog({ onSelectMedicineForOrder, darkMode }: SearchCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterGeneric, setFilterGeneric] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [selectedMedicineDetails, setSelectedMedicineDetails] = useState<Medicine | null>(null);

  // Filter medicines based on selections
  const filteredMedicines = useMemo(() => {
    return MEDICINES_DATABASE.filter((med) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }
      
      // 2. Generic Filter
      if (filterGeneric && !med.isGeneric) {
        return false;
      }

      // 3. Stock Filter
      if (filterInStock && med.availability === 'Out of Stock') {
        return false;
      }

      // 4. Keyword Search (Name, Generic Name, Manufacturer, Description)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = med.name.toLowerCase().includes(query);
        const matchesGeneric = med.genericName?.toLowerCase().includes(query) || false;
        const matchesMfr = med.manufacturer.toLowerCase().includes(query);
        const matchesDesc = med.description.toLowerCase().includes(query);
        const matchesForm = med.form.toLowerCase().includes(query);

        return matchesName || matchesGeneric || matchesMfr || matchesDesc || matchesForm;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, filterGeneric, filterInStock]);

  return (
    <div className="w-full" id="search-catalog-root">
      {/* Search Header Controls */}
      <div className={`p-6 rounded-2xl shadow-sm border mb-8 transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold font-display tracking-tight flex items-center gap-2 text-primary-navy dark:text-white">
              <span className="p-2 bg-brand-green/10 text-brand-green rounded-lg">
                <LucideIcon name="Search" className="w-5 h-5" />
              </span>
              Search Medicine Inventory
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Search across our verified catalog of genuine tablets, syrups, devices, and baby care essentials.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 bg-brand-green/10 text-brand-green rounded-full font-semibold">
              {filteredMedicines.length} Items Found
            </span>
          </div>
        </div>

        {/* Input & Checkboxes */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
              <LucideIcon name="Search" className="w-5 h-5" />
            </span>
            <input
              type="text"
              id="medicine-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by medicine name (e.g., Paracetamol), formula, or brand..."
              className={`w-full pl-11 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-green transition-all text-sm ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                title="Clear search"
              >
                <LucideIcon name="X" className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                id="filter-generic-checkbox"
                checked={filterGeneric}
                onChange={(e) => setFilterGeneric(e.target.checked)}
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green accent-brand-green border-slate-300"
              />
              <span>Generic Medicines Only (Saves Cost)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                id="filter-instock-checkbox"
                checked={filterInStock}
                onChange={(e) => setFilterInStock(e.target.checked)}
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green accent-brand-green border-slate-300"
              />
              <span>Available / In Stock Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-none" id="category-pills-slider">
        <div className="flex gap-2 min-w-max">
          {MEDICINE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-brand-green text-white shadow-sm'
                    : darkMode
                      ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <LucideIcon name={cat.iconName} className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="medicines-results-grid">
        <AnimatePresence mode="popLayout">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((med, index) => {
              const inStock = med.availability === 'In Stock';
              const delayedStock = med.availability === 'Available in 2 Hours';
              const outOfStock = med.availability === 'Out of Stock';

              return (
                <motion.div
                  key={med.id}
                  id={`med-card-${med.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.3) }}
                  layout
                  className={`flex flex-col justify-between p-5 rounded-2xl border transition-all hover:shadow-md hover:border-brand-green/30 ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}
                >
                  <div>
                    {/* Header: Form & Availability */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {med.form}
                      </span>

                      <span className={`text-[11px] font-medium flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
                        inStock 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : delayedStock 
                            ? 'bg-amber-500/10 text-amber-500' 
                            : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          inStock ? 'bg-emerald-500' : delayedStock ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        {med.availability}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-base leading-snug text-primary-navy dark:text-white hover:text-brand-green cursor-pointer"
                        onClick={() => setSelectedMedicineDetails(med)}>
                      {med.name}
                    </h4>

                    {/* Dosage & Manufacturer */}
                    <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-slate-400">
                      <span>{med.dosage}</span>
                      <span>•</span>
                      <span className="truncate max-w-[150px]">{med.manufacturer}</span>
                    </div>

                    {/* Generic Indicator */}
                    {med.isGeneric || med.genericName ? (
                      <div className="mb-3 px-2 py-1 bg-brand-green/5 border border-brand-green/10 rounded-lg text-[11px] text-brand-green flex items-center gap-1.5 font-medium">
                        <LucideIcon name="Shield" className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Generic formula: {med.genericName || med.name}</span>
                      </div>
                    ) : (
                      <div className="mb-3 text-[11px] text-slate-400 italic">
                        Branded prescription item
                      </div>
                    )}

                    {/* Description */}
                    <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {med.description}
                    </p>
                  </div>

                  <div>
                    {/* Price and Action Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">MRP Price</span>
                        <span className="text-base font-extrabold text-brand-green">₹{med.price.toFixed(2)}</span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setSelectedMedicineDetails(med)}
                          className={`p-2 rounded-lg transition-all border ${
                            darkMode 
                              ? 'border-slate-700 hover:bg-slate-800 text-slate-300' 
                              : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                          title="View Details"
                        >
                          <LucideIcon name="FileText" className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onSelectMedicineForOrder(med.name)}
                          disabled={med.availability === 'Out of Stock'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            med.availability === 'Out of Stock'
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                              : 'bg-brand-green hover:bg-brand-green-hover text-white shadow-sm'
                          }`}
                        >
                          <LucideIcon name="MessageSquare" className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center" id="no-search-results">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <LucideIcon name="Search" className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg">No medicines found</h4>
              <p className={`text-sm max-w-md mx-auto mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                We couldn't find any results matching "{searchQuery}". We can source almost any medicine in Gaya within 2-4 hours. Let us help you!
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFilterGeneric(false);
                  setFilterInStock(false);
                }}
                className="mt-4 px-4 py-2 bg-brand-green text-white font-semibold text-xs rounded-lg hover:bg-brand-green-hover transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedMedicineDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="med-details-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-green uppercase tracking-wide bg-brand-green/5 px-2 py-0.5 rounded">
                      {selectedMedicineDetails.form}
                    </span>
                    <h3 className="text-xl font-bold font-display mt-2 text-primary-navy dark:text-white">{selectedMedicineDetails.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Manufacturer: {selectedMedicineDetails.manufacturer}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMedicineDetails(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LucideIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <div className="my-6 space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider mb-1">Medicinal Usage</span>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {selectedMedicineDetails.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Strength / Dosage</span>
                      <span className="text-sm font-semibold">{selectedMedicineDetails.dosage}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Category</span>
                      <span className="text-sm font-semibold capitalize">{selectedMedicineDetails.category}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Availability Status</span>
                      <span className={`text-sm font-semibold flex items-center gap-1 ${
                        selectedMedicineDetails.availability === 'In Stock' 
                          ? 'text-emerald-500' 
                          : selectedMedicineDetails.availability === 'Available in 2 Hours'
                            ? 'text-amber-500'
                            : 'text-rose-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedMedicineDetails.availability === 'In Stock' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`} />
                        {selectedMedicineDetails.availability}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Generic Equivalency</span>
                      <span className="text-sm font-semibold">
                        {selectedMedicineDetails.isGeneric ? 'Generic Product' : 'Branded Formulation'}
                      </span>
                    </div>
                  </div>

                  {selectedMedicineDetails.isGeneric && (
                    <div className="p-3 bg-brand-green/10 rounded-xl text-xs text-brand-green leading-relaxed flex gap-2">
                      <LucideIcon name="Award" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Cost Saving Alert:</strong> As a certified generic medication, this product offers identical clinical quality and bio-equivalence to the branded equivalent, but at a 40% - 60% lower market price.
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block">Maximum Retail Price (MRP)</span>
                    <span className="text-xl font-extrabold text-brand-green">₹{selectedMedicineDetails.price.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMedicineDetails(null);
                        onSelectMedicineForOrder(selectedMedicineDetails.name);
                      }}
                      disabled={selectedMedicineDetails.availability === 'Out of Stock'}
                      className="px-4 py-2.5 bg-brand-green hover:bg-brand-green-hover disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <LucideIcon name="MessageSquare" className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
