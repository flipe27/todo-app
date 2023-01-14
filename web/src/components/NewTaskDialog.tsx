import { Dialog } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import { InputText } from './InputText'
import { X, Plus } from 'phosphor-react'
import axios from 'axios'
import { TaskGroup } from '../pages/Home'
import { TextAreaInput } from './TextAreaInput'

interface NewTaskDialogProps {
    taskGroupId: number,
    setTaskGroups: () => void,
    taskGroupSelected: TaskGroup
}

export function NewTaskDialog({ taskGroupId, setTaskGroups, taskGroupSelected }: NewTaskDialogProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    async function handleAddNewTask(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.title || !data.description) {
            return
        }

        try {
            await axios.post('http://localhost:3333/tasks/create', {
                taskGroupId,
	            title: data.title,
	            description: data.description
            }).then(response => {
                taskGroupSelected.tasks.push(response.data)
            })
        } catch(error) {
            console.log(error)
        }

        setTaskGroups()
        setIsOpen(false)
    }
    
    return (
        <>
            <button onClick={() => setIsOpen(true)} className="outline-none bg-blue-500 rounded-full p-2">
                <Plus weight="bold" size={30} />
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <form onSubmit={handleAddNewTask} className="fixed inset-0 flex items-center justify-center p-10">
                    <Dialog.Panel className="w-full max-w-[600px] p-4 flex flex-col rounded bg-white">
                        <Dialog.Title className="font-fredoka text-lg flex justify-between items-center">
                            <span>Add a new Task</span>
                            <X weight="bold" size={20} onClick={() => setIsOpen(false)} className="cursor-pointer" />
                        </Dialog.Title>
                        <InputText label="Task title" id="title" />
                        <TextAreaInput label="Task description" id="description" />
                        <button type="submit" className="w-full mt-4 font-semibold py-2 rounded bg-blue-500">Add</button>
                    </Dialog.Panel>
                </form>
            </Dialog>
        </>
    )
}
