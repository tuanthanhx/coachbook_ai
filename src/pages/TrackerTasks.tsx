import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, CircleCheckBig, Info, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import apiService from '@/lib/apiService';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Task {
  _id: string;
  title: string;
  description: string;
  instruction: string;
  isCompleted: boolean;
}

const Tracker = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskInstruction, setSelectedTaskInstruction] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState<string>('');
  const recentlyCompletedTaskRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiService.get<Task[]>(`/books/${id}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchBookTitle = async () => {
      try {
        const response = await apiService.get(`/books/${id}`);
        setBookTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching book title:', error);
      }
    };

    fetchTasks();
    fetchBookTitle();
  }, [id]);

  const handleMarkAsComplete = async (taskId: string) => {
    try {
      await apiService.post(`/books/${id}/tasks/${taskId}/complete`);
      setTasks(prevTasks => prevTasks.map(task =>
        task._id === taskId ? { ...task, isCompleted: true } : task
      ));
      recentlyCompletedTaskRef.current = taskId;
      toast.success('Task marked as complete!');

      setTimeout(() => {
        recentlyCompletedTaskRef.current = null;
        setTasks(prevTasks => [...prevTasks]);
      }, 3000);
    } catch (error) {
      console.error('Error marking task as complete:', error);
      toast.error('Failed to mark task as complete.');
    }
  };

  const completedTasksCount = tasks.filter(task => task.isCompleted).length;
  const totalTasksCount = tasks.length;
  const completedPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full min-h-7 text-center text-xl font-bold">{bookTitle}</h1>
      </div>
      {/* Statistics */}
      <div className="rounded-lg shadow-md py-8 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
        <div className="flex justify-between mb-4 px-6">
          <div className="w-1/2 flex flex-col justify-center items-center text-center text-white">
            <span className="font-bold text-2xl">{completedPercentage}%</span>
            <span>Completed</span>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center text-center text-white">
            <span className="font-bold text-2xl">{completedTasksCount}/{totalTasksCount}</span>
            <span>Tasks</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-black h-2 rounded-full" style={{ width: `${completedPercentage}%` }}></div>
        </div>
      </div>

      {/* List of Tasks */}
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`rounded-lg shadow-md p-5 mb-5 ${recentlyCompletedTaskRef.current === task._id ? 'bg-blue-100' : 'bg-white'}`}
        >
          <h2 className="flex items-center font-bold mb-2">
            {task.isCompleted && <CircleCheckBig className="w-7 h-7 mr-2 text-blue-500" />}
            <span className="flex-1">{task.title}</span>
          </h2>
          <p className="text-gray-600">{task.description}</p>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between gap-4">
              <Button className="flex-1 button" onClick={(e) => {
                e.stopPropagation();
                setSelectedTaskInstruction(task.instruction);
              }}>
                <Info />
                Open Instruction
              </Button>
              <Button className="flex-1 button" onClick={(e) => {
                e.stopPropagation();
                navigate('/chats/1');
              }}>
                <MessageCircle />
                Ask Coach
              </Button>
            </div>
            {!task.isCompleted && (
              <Button className="w-full button-primary" onClick={(e) => {
                e.stopPropagation();
                handleMarkAsComplete(task._id);
              }}>
                <CircleCheckBig />
                Mark as Complete
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Task Instruction Dialog */}
      <Dialog open={!!selectedTaskInstruction} onOpenChange={() => setSelectedTaskInstruction(null)}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[390px] py-6 px-4">
          <DialogHeader>
            <DialogTitle className="mb-2">Task Instruction</DialogTitle>
            <DialogDescription className="text-base text-left">
              {selectedTaskInstruction}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tracker;
