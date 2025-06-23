import Layout from '@/components/layouts/LayoutDefault';
import Greeting from '@/components/dashboard/Greeting';
import Quote from '@/components/dashboard/Quote';
import Statistics from '@/components/dashboard/Statistics';
import Discover from '@/components/dashboard/Discover';
import CurrentCoaches from '@/components/dashboard/CurrentCoaches';
import DailyInsights from '@/components/dashboard/DailyInsights';

const Dashboard = () => {
  return (
    <Layout>
      <Greeting />
      <Quote />
      <Statistics />
      <Discover />
      <CurrentCoaches />
      <DailyInsights />
    </Layout>
  );
};

export default Dashboard;
