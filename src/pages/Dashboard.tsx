import Layout from '@/components/Layout';
import Greeting from '@/components/dashboard/Greeting';
import Quote from '@/components/dashboard/Quote';
import Statistics from '@/components/dashboard/Statistics';
import Discover from '@/components/dashboard/Discover';
import CurrentCoaches from '@/components/dashboard/CurrentCoaches';

const Dashboard = () => {
  return (
    <Layout>
      <Greeting />
      <Quote />
      <Statistics />
      <Discover />
      <CurrentCoaches />
    </Layout>
  );
};

export default Dashboard;
