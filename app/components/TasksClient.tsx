'use client';

import { useOptimistic, startTransition } from 'react';
import { updateTaskStatus } from '../actions/tasks';

export default function TasksClient({ initialTasks }: { initialTasks: any[] }) {
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, updatedTask: any) => {
      return state.map(item => item.task.id === updatedTask.task.id ? updatedTask : item);
    }
  );

  const handleComplete = async (taskId: string) => {
    const taskItem = optimisticTasks.find(t => t.task.id === taskId);
    if (!taskItem) return;

    startTransition(() => {
      addOptimisticTask({
        ...taskItem,
        task: { ...taskItem.task, status: 'Completed' }
      });
    });

    try {
      await updateTaskStatus(taskId, 'Completed');
    } catch (e) {
      console.error('Failed to complete task', e);
    }
  };

  const visibleTasks = optimisticTasks.filter(t => t.task.status !== 'Completed');

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-surface-container-lowest">
          <tr>
            <th className="px-6 py-3 font-label-sm text-xs uppercase tracking-wider text-outline">Task Details</th>
            <th className="px-6 py-3 font-label-sm text-xs uppercase tracking-wider text-outline">Status</th>
            <th className="px-6 py-3 font-label-sm text-xs uppercase tracking-wider text-outline">Assigned To</th>
            <th className="px-6 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {visibleTasks.map(({ task, assignee }) => (
            <tr key={task.id} className="hover:bg-surface-container-low transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <p className="text-on-surface font-label-md text-sm">{task.title}</p>
                  <p className="text-outline font-body-md text-xs">{task.description}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-label-sm uppercase tracking-tight ${task.status === 'Overdue' ? 'bg-error-container/50 text-on-error-container' : 'bg-surface-container-high text-on-surface-variant'}`}>{task.status}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-surface-variant flex items-center justify-center text-[10px] font-bold text-on-surface">
                    {assignee ? assignee.name.charAt(0) : '?'}
                  </div>
                  <p className="text-on-surface font-label-md text-xs">{assignee ? assignee.name : 'Unassigned'}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => handleComplete(task.id)}
                  className="text-primary hover:bg-primary-fixed/30 p-1.5 rounded-lg transition-colors group-hover:bg-primary group-hover:text-white"
                  title="Mark as Completed"
                >
                  <span className="material-symbols-outlined">check</span>
                </button>
              </td>
            </tr>
          ))}
          {visibleTasks.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-outline-variant font-body-md">
                No pending tasks.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
