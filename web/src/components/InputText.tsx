interface InputTextProps {
    label: string
    id: string
}

export function InputText({ label, id }: InputTextProps) {
    return (
        <div className="my-2 flex flex-col gap-2 text-sm font-semibold">
            <label htmlFor={id}>{label}</label>
            <input name={id} id={id} className="h-8 outline-none font-normal pl-2 border border-black rounded" />
        </div>
    )
}
