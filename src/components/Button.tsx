
type ButtonProps = {
    label: string;
    type: "submit" | "button"
    onClick?: () => void;
}

export default function Button({ label, type = "button", onClick }: ButtonProps) {
    return <button onClick={onClick} type={type} className='border px-8 py-3 rounded-lg text-sm bg-slate-900 text-white '>{label}</button>

}