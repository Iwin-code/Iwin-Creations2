/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { VoterChecker } from './components/VoterChecker';
import { JurisdictionExplorer } from './components/JurisdictionExplorer';
import { CivicChecklist } from './components/CivicChecklist';
import { KivySimulator } from './components/KivySimulator';
import { VoterRightsGuide } from './components/VoterRightsGuide';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('checker');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(
      sectionId === 'checker'
        ? 'voter-checker'
        : sectionId === 'jurisdictions'
        ? 'jurisdictions'
        : sectionId === 'checklist'
        ? 'checklist'
        : sectionId === 'simulator'
        ? 'kivy-simulator'
        : 'voter-guide'
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerCheck = () => {
    scrollToSection('checker');
    const input = document.getElementById('age-input-field');
    if (input) {
      input.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Bar Contract (3 Zones) */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={scrollToSection}
        onTriggerCheck={handleTriggerCheck}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onScrollToChecker={() => scrollToSection('checker')}
          onOpenSimulator={() => scrollToSection('simulator')}
        />

        {/* Core IJS_VET Voter Checker */}
        <VoterChecker id="voter-checker" />

        {/* Comparative Legal Database */}
        <JurisdictionExplorer />

        {/* 6-Point Readiness Checklist */}
        <CivicChecklist />

        {/* Interactive Kivy Desktop OpenGL Simulator & Code Inspector */}
        <KivySimulator />

        {/* Constitutional Protections & Rights */}
        <VoterRightsGuide />
      </main>

      {/* Compliant Footer */}
      <Footer onSelectTab={scrollToSection} />
    </div>
  );
}
