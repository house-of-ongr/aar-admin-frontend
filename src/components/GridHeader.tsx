type HeaderProps = {
    headerTitles: List[]
}
type List = {
    name: string;
    width: string
}

export default function GridHeader({ headerTitles }: HeaderProps) {

    const gridTemplate = headerTitles.map((item) => item.width).join(" ");

    return (
        <div
            className="grid px-4 py-2 w-full text-sm mb-1  "
            style={{ gridTemplateColumns: gridTemplate }}
        >
            {headerTitles.map((item) => (
                <div key={item.name} className="text-center">
                    {item.name}
                </div>
            ))}
        </div>
    );
}
