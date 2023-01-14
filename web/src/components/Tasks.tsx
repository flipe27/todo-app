import { Task, TaskGroup } from '../pages/Home'
import { TaskCard } from './TaskCard'

interface TasksProps {
    tasks: Task[],
    taskGroupSelected: TaskGroup,
    handleAddTaskGroup: () => void
}

export function Tasks({ tasks, taskGroupSelected, handleAddTaskGroup }: TasksProps) {
    return (
        <div className="h-[calc(100%-5rem)] overflow-auto scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
            {tasks.map(task => {
                return (
                    <TaskCard task={task} key={task.id} id={task.id} taskGroupSelected={taskGroupSelected} setTaskGroups={handleAddTaskGroup} />
                )
            })}
        </div>
    )
}
