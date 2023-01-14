import { Switch } from '@headlessui/react'
import { Moon, Sun } from 'phosphor-react'

interface DarkModeToogleProps {
    enabled: boolean,
    isEnabled: () => void
}

export function DarkModeToogle({ enabled, isEnabled }: DarkModeToogleProps) {
    function changeDarkMode() {
        isEnabled()
    }

    return (
        <Switch checked={enabled} onChange={changeDarkMode} className={`${enabled ? 'bg-red-400' : 'bg-blue-500'} relative inline-flex h-6 w-11 items-center rounded-full`}>
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} h-4 w-4 transform rounded-full bg-white transition flex items-center justify-center`}>
                {!enabled ? <Moon weight="bold" className="text-black" size={14} /> : <Sun weight="bold" className="text-yellow-500" size={14} />}
            </span>
        </Switch>
    )
}
