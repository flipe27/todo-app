import { Dialog } from '@headlessui/react'
import { Plus, X } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { InputText } from './InputText'
import axios from 'axios'

interface NewTaskGroupDialogProps {
    userId: string | undefined,
    onAddTaskGroup: () => void,
}

export function NewTaskGroupDialog({ userId, onAddTaskGroup }: NewTaskGroupDialogProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    async function handleAddTaskGroup(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.newTaskGroupName) {
            return
        }

        try {
            await axios.post('http://localhost:3333/taskGroups/create', {
                userId,
                name: data.newTaskGroupName
            })
        } catch(error) {
            console.log(error)
        }

        onAddTaskGroup()
        setIsOpen(false)
    }

    return (
        <div>
            <button className="m-4 flex justify-between outline-none">
                <Plus onClick={() => setIsOpen(true)} weight="bold" size={30} className="cursor-pointer rounded-full" />
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <form onSubmit={handleAddTaskGroup} className="fixed inset-0 flex items-center justify-center p-10">
                    <Dialog.Panel className="w-full max-w-[600px] p-4 flex flex-col rounded bg-white">
                        <Dialog.Title className="font-fredoka text-lg flex justify-between items-center">
                            <span>Add a new Task Group</span>
                            <X weight="bold" size={20} onClick={() => setIsOpen(false)} className="cursor-pointer" />
                        </Dialog.Title>
                        <InputText label="Task group title" id="newTaskGroupName" />
                        <button type="submit" className="w-full mt-4 font-semibold py-2 rounded bg-blue-500">Add</button>
                    </Dialog.Panel>
                </form>
            </Dialog>
        </div>
    )
}
