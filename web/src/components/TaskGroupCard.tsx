import { Trash } from 'phosphor-react'
import { TaskGroup } from '../pages/Home'
import { useState } from 'react'
import axios from 'axios'

interface TaskGroupProps {
    taskGroup: TaskGroup,
    onSetTasksAndTaskGroup: () => void,
    setTaskGroups: () => void,
    clearTaskGroupSelected: () => void,
    clearTasks: () => void
}

export function TaskGroupCard({ taskGroup, onSetTasksAndTaskGroup, setTaskGroups, clearTaskGroupSelected, clearTasks }: TaskGroupProps) {
    const [trashIsVisible, setTrashIsVisible] = useState<boolean>(false)

    function setTasksAndTaskGroup() {
        onSetTasksAndTaskGroup()
    }

    async function handleDeleteTaskGroup() {
        try {
            await axios.delete(`http://localhost:3333/taskGroups/delete/${taskGroup.id}`)
        } catch(error) {
            console.log(error)
        }

        clearTasks()
        clearTaskGroupSelected()
        setTaskGroups()
    }

    return (
        <div onClick={setTasksAndTaskGroup} onMouseEnter={() => setTrashIsVisible(true)} onMouseLeave={() => setTrashIsVisible(false)} className="mx-4 mb-4 p-2 flex items-center justify-between rounded cursor-pointer bg-blue-500">
            <span>{taskGroup.name}</span>
            <Trash onClick={handleDeleteTaskGroup} weight="regular" size={22} className={`${trashIsVisible ? 'visible' : 'hidden'}`} />
        </div>
    )
}
