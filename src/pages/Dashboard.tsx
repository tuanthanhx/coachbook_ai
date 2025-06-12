import Layout from '@/components/Layout';
import Discover from '@/components/dashboard/Discover';
import Greeting from '@/components/dashboard/Greeting';
import Quote from '@/components/dashboard/Quote';
import Statistics from '@/components/dashboard/Statistics';

const Dashboard = () => {
  return (
    <Layout>
      <Greeting />
      <Quote />
      <Statistics />
      <Discover />
    </Layout>
  );
};

export default Dashboard;
