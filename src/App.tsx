import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { FloatingStars } from './components/common/FloatingStars';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { CelebrationModal } from './components/common/CelebrationModal';
import { HomeDashboard } from './components/home/HomeDashboard';
import { LessonsMap } from './components/learn/LessonsMap';
import { VocabularySection } from './components/vocabulary/VocabularySection';
import { GrammarSection } from './components/grammar/GrammarSection';
import { QuizArena } from './components/quiz/QuizArena';
import { MathSection } from './components/math/MathSection';
import { RewardsPage } from './components/rewards/RewardsPage';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { ProfileView } from './components/profile/ProfileView';
import { DailyChallengeModal } from './components/challenge/DailyChallengeModal';
import { AdminPanel } from './components/admin/AdminPanel';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-slate-950">
      
      {/* Starry Night Glowing Atmosphere Background */}
      <FloatingStars />

      {/* Global Application Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {currentTab === 'home' && (
          <HomeDashboard
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
          />
        )}

        {currentTab === 'lessons' && <LessonsMap />}

        {currentTab === 'vocab' && <VocabularySection />}

        {currentTab === 'grammar' && <GrammarSection />}

        {currentTab === 'quiz' && <QuizArena />}

        {currentTab === 'challenge' && (
          <div className="max-w-2xl mx-auto">
            <HomeDashboard
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
            />
          </div>
        )}

        {currentTab === 'math' && <MathSection />}

        {currentTab === 'rewards' && <RewardsPage />}

        {currentTab === 'leaderboard' && <LeaderboardView />}

        {currentTab === 'profile' && <ProfileView />}
      </main>

      {/* Daily Challenge Modal Popup */}
      <DailyChallengeModal
        isOpen={isDailyChallengeOpen}
        onClose={() => setIsDailyChallengeOpen(false)}
      />

      {/* Academy Admin Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Level-Up Fanfare & Floating Celebrations */}
      <CelebrationModal />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
