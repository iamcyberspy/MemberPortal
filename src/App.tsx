/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { Profile } from './views/Profile';
import { Settings } from './views/Settings';
import { Billing } from './views/Billing';
import { Login } from './views/Login';
import { UserData } from './types';

export type View = 'dashboard' | 'profile' | 'settings' | 'billing' | 'login';

const DEFAULT_USER: UserData = {
  fullName: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  username: 'alexm_pro',
  phone: '+1 (555) 012-3456',
  location: 'San Francisco, CA',
  bio: 'UX Designer and photography enthusiast. Member since 2022. Passionate about community building.',
  timezone: 'Pacific Standard Time (PST)',
  avatarSeed: 'Alex',
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData>(DEFAULT_USER);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView} user={user}>
      {currentView === 'dashboard' && <Dashboard user={user} onNavigate={setCurrentView} />}
      {currentView === 'profile' && <Profile user={user} onUpdate={setUser} />}
      {currentView === 'settings' && <Settings user={user} onUpdate={setUser} />}
      {currentView === 'billing' && <Billing />}
    </Layout>
  );
}
