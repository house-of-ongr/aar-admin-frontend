
type ButtonProps = {
    label: string;
    type?: "submit" | "button"
    onClick?: () => void;
    disabled?: boolean
}

export default function Button({ label, type = "button", onClick, disabled }: ButtonProps) {
    return (
        <button onClick={onClick} type={type} disabled={disabled} className='border px-8 py-3 rounded-lg text-sm bg-slate-900 text-white disabled:cursor-not-allowed '>{label}</button>
    )


}