import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { CircleCheck, ChevronLeft, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import apiService from '@/lib/apiService';
import { Skeleton } from '@/components/ui/skeleton';

interface Insight {
  _id: string;
  insightId: {
    title: string;
    content: string;
    bookId: {
      _id: string;
      title: string;
      author: string;
    };
  };
  comment: string;
  isHelpful?: boolean;
  updatedAt: string;
}

const CompletedInsights = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService.get('/books/completed-insights')
      .then(response => {
        const insightsData: Insight[] = response.data;
        setInsights(insightsData);
      })
      .catch(error => console.error('Error fetching completed insights:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/insights')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Completed Insights</h1>
      </div>
      {loading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-38 rounded-lg shadow-md" />
          {[...Array(3)].map((_, index) => (
            <div key={index} className="rounded-lg shadow-md py-6 px-5 bg-white">
              <Skeleton className="h-[1.5em] mb-1" />
              <Skeleton className="h-[1em] mb-4" />
              <Skeleton className="h-[1em] mb-1" />
              <Skeleton className="h-[1em] mb-1" />
              <Skeleton className="h-[1em] mb-1" />
              <Skeleton className="h-[1em] mb-4" />
              <Skeleton className="h-[5em] rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        insights.length === 0 ? (
          <div className="rounded-lg shadow-md py-6 px-4 mb-5 bg-white text-center">
            <h2 className="mb-2 font-bold">No Completed Insights</h2>
            <p className="text-gray-600">You haven't completed any insights yet.</p>
          </div>
        ) : (
          <>
            <div className="rounded-lg shadow-md py-6 px-5 mb-5 text-center text-white bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
              <div className="text-xl font-bold mb-2">Your Completed Insights</div>
              <div className="text-3xl font-bold mb-2">{insights.length}</div>
              <div>Total Completed</div>
            </div>

            {insights.map((insight) => (
              <div key={insight._id} className="rounded-lg shadow-md p-5 mb-5 bg-white">
                <div className="w-full">
                  <h2 className="text-xl font-bold">{insight.insightId.title}</h2>
                  <p className="mb-4 text-sm text-gray-500">{insight.insightId.bookId.title} • {insight.insightId.bookId.author}</p>
                  <p>{insight.insightId.content}</p>

                  {(insight.comment || insight.isHelpful !== undefined) && (
                    <div className="bg-blue-100 p-4 rounded-lg mt-4">
                      <h3 className="mb-2 font-bold">Your reflection</h3>
                      {insight.comment && <p className="italic">"{insight.comment}"</p>}
                      {insight.isHelpful !== undefined && (
                        <div className="flex items-center gap-2 mt-4">
                          {insight.isHelpful ? (
                            <ThumbsUp className="text-green-500" />
                          ) : (
                            <ThumbsDown className="text-red-500" />
                          )}
                          <span className="text-gray-600">
                            {insight.isHelpful ? 'Helpful' : 'Not Helpful'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="flex justify-start items-center mt-5 text-sm text-gray-500">
                    <CircleCheck className="w-5 h-5 mr-2 -mt-0.5" />
                    <span>{new Date(insight.updatedAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            ))}
          </>
        )
      )}
    </Layout>
  );
};

export default CompletedInsights;
