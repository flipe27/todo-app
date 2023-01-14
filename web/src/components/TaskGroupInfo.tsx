import { TaskGroup } from '../pages/Home'

interface TaskGroupInfoProps {
    taskGroupSelected: TaskGroup
}

export function TaskGroupInfo({ taskGroupSelected }: TaskGroupInfoProps) {
    return (
        <div className="w-full my-4 flex flex-col items-center justify-center">
            {
                Object.keys(taskGroupSelected).length > 0 ?
                <h1 className="font-fredoka text-xl">{taskGroupSelected.name}</h1>
                : <span className="text-sm font-semibold">Select or create a task group</span>
            }   
        </div>
    )
}
