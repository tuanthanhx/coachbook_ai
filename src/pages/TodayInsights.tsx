import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CircleCheckBig, History, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import apiService from '@/lib/apiService';
import { Skeleton } from '@/components/ui/skeleton';

interface Insight {
  _id: string;
  title: string;
  content: string;
  bookTitle: string;
  bookAuthor: string;
  isCompleted: boolean;
  comment?: string;
  isHelpful?: boolean;
}

const TodayInsights = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [slideStates, setSlideStates] = useState<Record<string, { comment: string; isHelpful: boolean | undefined; completed?: boolean }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (api) {
      const onSelect = () => {
        setSelectedIndex(api.selectedScrollSnap());
      };
      api.on('select', onSelect);
      return () => {
        api.off('select', onSelect);
      };
    }
  }, [api]);

  useEffect(() => {
    setLoading(true);
    apiService.get('/books/daily-insights')
      .then(response => {
        const insightsData: Insight[] = response.data;
        setInsights(insightsData);

        // Merge API properties into slideStates
        const updatedSlideStates = insightsData.reduce<Record<string, { comment: string; isHelpful: boolean | undefined; completed?: boolean }>>((acc, insight) => {
          acc[insight._id] = {
            comment: insight.comment || '',
            isHelpful: insight.isHelpful,
            completed: insight.isCompleted,
          };
          return acc;
        }, {});

        setSlideStates(updatedSlideStates);
      })
      .catch(error => console.error('Error fetching daily insights:', error))
      .finally(() => setLoading(false));
  }, []);

  const complete = (insightId: string) => {
    const payload = slideStates[insightId] || { comment: '', isHelpful: undefined };

    apiService.post(`/books/insights/${insightId}/complete`, payload)
      .then(() => {
        console.log('Insight marked as complete');
        setSlideStates(prev => ({ ...prev, [insightId]: { ...prev[insightId], completed: true } }));
      })
      .catch(error => console.error('Error completing insight:', error));
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Today's Insights</h1>
        <History className="bg-white rounded-full w-10 h-10 p-2 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer" onClick={() => navigate('/completed-insights')} />
      </div>
      {loading ? (
        <div className="flex flex-col gap-4">
          <>
            <div className="rounded-lg shadow-md py-6 px-5 mb-5 bg-white">
              <Skeleton className="h-[1.5em] mb-1" />
              <Skeleton className="h-[1em] mb-4" />
              <Skeleton className="h-[1em] mb-1" />
              <Skeleton className="h-[1em] mb-1" />
              <Skeleton className="h-[1em] mb-1" />
              <Skeleton className="h-[1em] mb-4" />
              <Skeleton className="h-[5em] rounded-lg" />
            </div>
            <div className="rounded-lg shadow-md p-5 mb-5 bg-white">
              <Skeleton className="h-[2em] mb-2" />
              <Skeleton className="h-[4em]" />
            </div>
          </>
        </div>
      ) : (
        insights.length === 0 ? (
          <div className="rounded-lg shadow-md py-6 px-4 mb-5 bg-white text-center">
            <h2 className="mb-2 font-bold">No Insights Available</h2>
            <p className="text-gray-600">Follow some coaches to see insights here!</p>
          </div>
        ) : (
          <div>
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full pb-21">
              <CarouselContent>
                {insights.map((insight, index) => (
                  <CarouselItem key={index}>
                    {slideStates[insight._id]?.completed && (
                      <div className="rounded-lg shadow-md py-7 px-5 mb-5 text-center text-white bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
                        <CircleCheckBig className="w-10 h-10 mx-auto mb-4" />
                        <div className="text-xl font-bold mb-2">Insight Completed! 🎉</div>
                      </div>
                    )}
                    <div className="rounded-lg shadow-md p-5 mb-5 bg-white">
                      <div className="w-full">
                        <h2 className="text-xl font-bold">{insight.title}</h2>
                        <p className="mb-4 text-gray-500">{insight.bookTitle} • {insight.bookAuthor}</p>
                        <p>{insight.content}</p>
                        {!slideStates[insight._id]?.completed ? (
                          <div className="bg-blue-100 p-5 rounded-lg mt-4">
                            <h3 className="mb-2 font-bold">Reflect on this insight</h3>
                            <p className="mb-4">Reflect on this insight and think about how it applies to your daily life. What's one small action you can take today to make progress?</p>
                            <Textarea
                              className="min-h-24 bg-white"
                              placeholder="Write your thoughts here..."
                              value={slideStates[insight._id]?.comment || ''}
                              onChange={(e) => setSlideStates(prev => ({
                                ...prev,
                                [insight._id]: {
                                  ...prev[insight._id],
                                  comment: e.target.value,
                                },
                              }))}
                            />
                          </div>
                        ) : (
                          <>
                            {(slideStates[insight._id]?.comment || slideStates[insight._id]?.isHelpful !== undefined) && (
                              <div className="bg-blue-100 p-4 rounded-lg mt-4">
                                <h3 className="mb-2 font-bold">Your reflection</h3>
                                {slideStates[insight._id]?.comment && <p className="italic">"{slideStates[insight._id]?.comment}"</p>}
                                {slideStates[insight._id]?.isHelpful !== undefined && (
                                  <div className="flex items-center gap-2 mt-4">
                                    {slideStates[insight._id]?.isHelpful ? (
                                      <ThumbsUp className="text-green-500" />
                                    ) : (
                                      <ThumbsDown className="text-red-500" />
                                    )}
                                    <span className="text-gray-600">
                                      {slideStates[insight._id]?.isHelpful ? 'Helpful' : 'Not Helpful'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {!slideStates[insight._id]?.completed && (
                      <>
                        <div className="rounded-lg shadow-md p-5 mb-5 bg-white">
                          <h2 className="font-bold text-lg mb-2">How was this insight?</h2>
                          <div className="flex justify-between gap-3">
                            <Button
                              variant="outline"
                              className={`flex-1 h-10 font-bold ${slideStates[insight._id]?.isHelpful === true ? 'bg-blue-100' : ''}`}
                              onClick={() => setSlideStates(prev => ({
                                ...prev,
                                [insight._id]: {
                                  ...prev[insight._id],
                                  isHelpful: true,
                                },
                              }))}
                            >
                              <span className="flex items-center justify-center gap-2">
                                <ThumbsUp />
                                Helpful
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              className={`flex-1 h-10 font-bold ${slideStates[insight._id]?.isHelpful === false ? 'bg-blue-100' : ''}`}
                              onClick={() => setSlideStates(prev => ({
                                ...prev,
                                [insight._id]: {
                                  ...prev[insight._id],
                                  isHelpful: false,
                                },
                              }))}
                            >
                              <span className="flex items-center justify-center gap-2">
                                <ThumbsDown />
                                Not Helpful
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <Button
                            className="w-full button-primary"
                            onClick={() => complete(insight._id)}
                          >
                            <CircleCheckBig />
                            Mark as Complete
                          </Button>
                        </div>
                      </>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {insights.length > 1 && (
              <div className="flex justify-between items-center max-w-[390px] mt-4 p-5 bg-gray-50 rounded-lg shadow-md fixed w-full bottom-25" style={{ width: 'calc(100vw - 2.5rem' }}>
                <MoveLeft className="cursor-pointer" onClick={() => { api?.scrollPrev() }} />
                <div className="flex gap-2">
                  {[...Array(api?.scrollSnapList().length || 0)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === selectedIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <MoveRight className="cursor-pointer" onClick={() => { api?.scrollNext() }} />
              </div>
            )}
          </div>
        )
      )}
    </Layout>
  );
};

export default TodayInsights;
