import Image from "next/image";

export default function InitHoutImage() {
    return (
        <div className="cursor-pointer">
            <Image priority src={'/images/init-house.png'} alt='init-home' width={220} height={200} />
        </div>)
}
