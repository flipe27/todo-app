import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DarkModeToogle } from '../components/DarkModeToogle'
import { NewTaskDialog } from '../components/NewTaskDialog'
import { NewTaskGroupDialog } from '../components/NewTaskGroupDialog'
import { TaskGroupInfo } from '../components/TaskGroupInfo'
import { TaskGroupCard } from '../components/TaskGroupCard'
import { Tasks } from '../components/Tasks'

export interface User {
    name: string,
    email: string,
    picture?: string
}

export interface Task {
    id: number,
    title: string,
    description: string,
    picture?: string,
    createdAt: string
}

export interface TaskGroup {
    id: number,
    name: string,
    createdAt: string,
    tasks: Task[]
}

export function Home() {
    const { userId } = useParams<string>()

    const [darkMode, isDarkMode] = useState<boolean>(false)

    const [userData, setUserData] = useState<User>({} as User)
    const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskGroupSelected, setTaskGroupSelected] = useState<TaskGroup>({} as TaskGroup)

    useEffect(() => {
        axios.get(`http://localhost:3333/user/${userId}`)
        .then(response => {
            setUserData(response.data)
        })
    }, [])

    if (Object.keys(userData).length > 0) {
        document.title = `TODO App - ${userData.name}`
    }

    if (Object.keys(userData).length > 0 && taskGroups.length == 0) {
        axios.get(`http://localhost:3333/taskGroups/${userId}`)
        .then(response => {
            setTaskGroups(response.data)
        })
    }

    function setTasksAndTaskGroup({ id, name, createdAt, tasks }: TaskGroup) {
        setTasks(tasks)
        setTaskGroupSelected({
            id,
            name,
            createdAt,
            tasks
        })
    }

    async function handleAddTaskGroup() {
        try {
            await axios.get(`http://localhost:3333/taskGroups/${userId}`)
            .then(response => {
                setTaskGroups(response.data)
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className={`${darkMode ? 'darkMode' : 'defaultMode'} flex transition-colors`}>
            <div className="w-[350px] h-[100vh] border-r border-gray-300">
                <div className="w-full h-20 items-center flex gap-4 px-4 border-b border-gray-300">
                    <img src={userData.picture} alt="User photo" className="w-14 rounded-full" />
                    <div>
                        <p className="font-semibold font-fredoka">{userData.name}</p>
                        <p className="text-sm">{userData.email}</p>
                    </div>
                </div>
                <div>
                    <NewTaskGroupDialog userId={userId} onAddTaskGroup={handleAddTaskGroup} />
                    <div className="h-[30rem] overflow-auto scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
                        {taskGroups.map(taskGroup => {
                            return (
                                <TaskGroupCard key={taskGroup.id} taskGroup={taskGroup} onSetTasksAndTaskGroup={() => setTasksAndTaskGroup(taskGroup)} setTaskGroups={handleAddTaskGroup} clearTaskGroupSelected={() => setTaskGroupSelected({} as TaskGroup)} clearTasks={() => setTasks([])} />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-[calc(100vw-350px)] flex flex-col items-center">
                <div className="w-full h-20 flex items-center justify-end px-6">
                    <DarkModeToogle enabled={darkMode} isEnabled={() => isDarkMode(!darkMode)} />
                </div>
                <div className="w-[95%] h-[calc(100vh-6rem)] relative p-2 border rounded-lg border-gray-300">
                    <TaskGroupInfo taskGroupSelected={taskGroupSelected} />
                    <Tasks tasks={tasks} taskGroupSelected={taskGroupSelected} handleAddTaskGroup={handleAddTaskGroup} />
                    <div className="absolute bottom-4 right-4">
                        {taskGroupSelected.id ? <NewTaskDialog taskGroupId={taskGroupSelected.id} setTaskGroups={handleAddTaskGroup} taskGroupSelected={taskGroupSelected} /> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
