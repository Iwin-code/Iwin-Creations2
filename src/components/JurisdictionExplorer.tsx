import React, { useState } from 'react';
import { Search, Globe, ShieldAlert, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { JURISDICTIONS } from '../data/jurisdictions';
import { JurisdictionRule } from '../types/voting';

export const JurisdictionExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<JurisdictionRule | null>(
    JURISDICTIONS[0]
  );

  const regions = ['all', 'United States', 'Europe', 'North America', 'South America', 'Asia', 'Oceania'];

  const filteredJurisdictions = JURISDICTIONS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === 'all' ||
      item.region === selectedRegion ||
      (selectedRegion === 'United States' && item.id.startsWith('us_'));
    return matchesSearch && matchesRegion;
  });

  return (
    <section id="jurisdictions" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <span>Comparative Legal Database</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Voting Thresholds</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Jurisdiction Eligibility Rules & Laws
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            While 18 is the standard international voting age, regional laws vary significantly—including youth preregistration at 16, compulsory voting, and photo identification statutes.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Region Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg overflow-x-auto">
            {['all', 'United States', 'Europe', 'South America', 'Asia'].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  selectedRegion === reg
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {reg === 'all' ? 'All Regions' : reg}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jurisdiction or law..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Jurisdictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJurisdictions.map((item) => {
            const isSelected = selectedJurisdiction?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedJurisdiction(item)}
                className={`bg-white rounded-xl border p-6 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" role="img" aria-label={item.name}>
                        {item.flagEmoji}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {item.region}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-blue-600 tabular-nums">
                        {item.votingAge}+
                      </span>
                      <span className="block text-[10px] text-slate-400 font-medium">
                        Voting Age
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {item.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Preregister: <strong className="text-slate-800">{item.preregistrationAge ? `Age ${item.preregistrationAge}` : 'N/A'}</strong>
                  </span>
                  <span>
                    Compulsory: <strong className="text-slate-800">{item.compulsory ? 'Yes (Mandatory)' : 'No'}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Jurisdiction Deep Dive Spotlight */}
        {selectedJurisdiction && (
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedJurisdiction.flagEmoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedJurisdiction.name} Detailed Requirements
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official civic guidelines and statutory voter eligibility rules
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
                <span className="px-2.5 py-1 bg-slate-100 rounded-md">
                  Min Age: <strong className="text-slate-900">{selectedJurisdiction.votingAge} years</strong>
                </span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-md">
                  Voting: <strong className="text-slate-900">{selectedJurisdiction.compulsory ? 'Mandatory by Law' : 'Voluntary'}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Youth Preregistration
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedJurisdiction.preregistrationAge
                    ? `Eligible at Age ${selectedJurisdiction.preregistrationAge}`
                    : 'Standard Registration at Voting Age'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Enables upcoming voters to submit papers prior to turning legal age.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Identification Rules
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedJurisdiction.idRequirements === 'strict_photo'
                    ? 'Strict Photo ID Required'
                    : selectedJurisdiction.idRequirements === 'photo_or_non_photo'
                    ? 'Photo or Approved Non-Photo ID'
                    : selectedJurisdiction.idRequirements === 'biometric_national_id'
                    ? 'Biometric National Voter Card'
                    : 'Signature Match / No ID Mandate'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Check accepted documents before arriving at the polling station.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Registration Cutoff
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedJurisdiction.registrationDaysBeforeElection === 0
                    ? 'Same-Day / Election Day Registration'
                    : `${selectedJurisdiction.registrationDaysBeforeElection} Days Prior to Election`}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Online registration: {selectedJurisdiction.onlineRegistrationAvailable ? 'Available online' : 'Mail / In-Person only'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
