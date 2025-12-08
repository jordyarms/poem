import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import Availability from './pages/Availability';
import Roles from './pages/Roles';
import MarketData from './pages/MarketData';
import MakeBooking from './pages/MakeBooking';
import SelectWorkers from './pages/SelectWorkers';
import Requirements from './pages/Requirements';
import Packages from './pages/Packages';
import CreateIntervention from './pages/CreateIntervention';
import BusinessPools from './pages/BusinessPools';
import ChainBuilder from './pages/ChainBuilder';
import MarketInterventions from './pages/MarketInterventions';
import Finance from './pages/Finance';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Search from './pages/Search';
import MyFunds from './pages/MyFunds';
import ThisMorningsRoutes from './pages/ThisMorningsRoutes';
import UnifundRegistry from './pages/UnifundRegistry';
import TransitionDashboard from './pages/TransitionDashboard';
import MyChecks from './pages/MyChecks';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'opportunities',
        element: <Opportunities />,
      },
      {
        path: 'availability',
        element: <Availability />,
      },
      {
        path: 'roles',
        element: <Roles />,
      },
      {
        path: 'market-data',
        element: <MarketData />,
      },
      {
        path: 'booking',
        element: <MakeBooking />,
      },
      {
        path: 'select-workers',
        element: <SelectWorkers />,
      },
      {
        path: 'requirements',
        element: <Requirements />,
      },
      {
        path: 'packages',
        element: <Packages />,
      },
      {
        path: 'intervention',
        element: <CreateIntervention />,
      },
      {
        path: 'pools',
        element: <BusinessPools />,
      },
      {
        path: 'chains',
        element: <ChainBuilder />,
      },
      {
        path: 'interventions',
        element: <MarketInterventions />,
      },
      {
        path: 'finance',
        element: <Finance />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'profile/:userId?',
        element: <Profile />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'my-funds',
        element: <MyFunds />,
      },
      {
        path: 'mornings-routes',
        element: <ThisMorningsRoutes />,
      },
      {
        path: 'unifund-registry',
        element: <UnifundRegistry />,
      },
      {
        path: 'transition-dashboard',
        element: <TransitionDashboard />,
      },
      {
        path: 'my-checks',
        element: <MyChecks />,
      },
    ],
  },
]);
