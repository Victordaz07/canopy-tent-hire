import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { signOutAdmin } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';
import { BookingsTable } from '../components/admin/BookingsTable';
import { ReviewsModeration } from '../components/admin/ReviewsModeration';
import { TentsManager } from '../components/admin/TentsManager';

const TABS = [
  { key: 'bookings', labelKey: 'admin.bookings', Component: BookingsTable },
  { key: 'moderation', labelKey: 'admin.moderation', Component: ReviewsModeration },
  { key: 'tents', labelKey: 'admin.tentsManagement', Component: TentsManager },
] as const;

export function AdminDashboard() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['key']>('bookings');

  const ActiveComponent = TABS.find((tab) => tab.key === activeTab)?.Component ?? BookingsTable;

  return (
    <div className="min-h-screen bg-bg px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl text-ink">{t('admin.dashboard')}</h1>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-xl border border-muted/30 px-3 py-2 text-sm font-semibold text-muted transition-colors hover:border-canopy/40 hover:text-canopy"
            >
              ← {t('nav.home')}
            </Link>
            <button
              onClick={toggleLanguage}
              className="rounded-xl border border-muted/30 px-3 py-2 text-sm font-bold text-muted transition-colors hover:border-canopy/40 hover:text-canopy"
            >
              {language === 'en' ? 'TO' : 'EN'}
            </button>
            <Button variant="secondary" onClick={() => signOutAdmin()}>
              {t('admin.signOut')}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex gap-2 border-b border-muted/20">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === tab.key ? 'border-b-2 border-sun text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
