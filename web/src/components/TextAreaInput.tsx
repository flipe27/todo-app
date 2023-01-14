interface TextAreaProps {
    label: string,
    id: string
}

export function TextAreaInput({ label, id }: TextAreaProps) {
    return (
        <div className="flex flex-col text-sm font-semibold gap-2">
            <label htmlFor={id}>{label}</label>
            <textarea name={id} id={id} className="overflow-auto scrollbar-thumb-zinc-400 scrollbar-track-transparent scrollbar-thin font-normal border border-black outline-none rounded p-2" />
        </div>
    )
}
