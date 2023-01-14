import { useState } from 'react'
import { Task, TaskGroup } from '../pages/Home'
import { Check } from 'phosphor-react'
import axios from 'axios'

interface TaskCardProps {
    id:number,
    task: Task,
    taskGroupSelected: TaskGroup
    setTaskGroups: () => void
}

export function TaskCard({ id, task, taskGroupSelected, setTaskGroups }: TaskCardProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const [showCheckIcon, setShowCheckIcon] = useState<boolean>(false)

    const createdAt = task.createdAt.slice(0, 10).split('-')
    const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`

    async function handleCompleteTask() {
        try {
            await axios.delete(`http://localhost:3333/tasks/delete/${id}`)
            .then(response => {
                taskGroupSelected.tasks.splice(taskGroupSelected.tasks.indexOf(response.data), 1)
            })
        } catch(error) {
            console.log(error)
        }

        setTaskGroups()
    }

    return (
        <div onClick={() => setIsExpanded(!isExpanded)} className="flex items-center p-2 my-2 mb-4 mx-4 rounded cursor-pointer transition bg-red-400">
            <div className={`${isExpanded ? 'visible' : 'hidden'} mx-3`}>
                <div onClick={handleCompleteTask} onMouseEnter={() => setShowCheckIcon(true)} onMouseLeave={() => setShowCheckIcon(false)} className="w-6 h-6 flex items-center justify-center text-green-500 bg-white rounded-full">
                    <Check weight="bold" size={20} className={`${showCheckIcon ? 'visible' : 'hidden'}`} />
                </div>
            </div>
            <div>
                <span className={`${isExpanded ? 'font-fredoka text-lg' : ''}`}>{task.title}</span>
                {
                    isExpanded ?
                    <div>
                        <p className="my-2">{task.description}</p>
                        <span className="text-xs">Created at {date}</span>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}
