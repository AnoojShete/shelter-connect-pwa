import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ShelterListingPage } from './components/ShelterListingPage';
import { ShelterDetailPage } from './components/ShelterDetailPage';
import { EmergencyHelpPage } from './components/EmergencyHelpPage';
import { NotFound } from './components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'shelters', Component: ShelterListingPage },
      { path: 'shelter/:id', Component: ShelterDetailPage },
      { path: 'emergency', Component: EmergencyHelpPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
