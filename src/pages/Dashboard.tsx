import Layout from '@/components/layouts/LayoutDefault';
import Greeting from '@/components/dashboard/Greeting';
import Quote from '@/components/dashboard/Quote';
import Statistics from '@/components/dashboard/Statistics';
import Discover from '@/components/dashboard/Discover';
import CurrentCoaches from '@/components/dashboard/CurrentCoaches';
import DailyInsights from '@/components/dashboard/DailyInsights';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Layout>
      <Greeting user={{ avatar: user?.avatar, fullname: user?.fullname }} />
      <Quote />
      <Statistics statistics={{ chatsCount: user?.chatsCount, coachesCount: user?.coachesCount }} />
      <Discover />
      <CurrentCoaches />
      <DailyInsights />
    </Layout>
  );
};

export default Dashboard;
