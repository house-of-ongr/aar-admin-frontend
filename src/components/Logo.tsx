import Image from "next/image";
import Link from "next/link";
import React from 'react'


type LogoProps = {
    showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
    return (
        <Link href={"/"} className="flex flex-col items-center md:flex-row gap-2 p-7 cursor-pointer">
            <Image src={"/images/logo.png"} alt="archive of ongr logo image" width="50" height="50">
            </Image>

            {showText && (
                <span className="font-thin md:h-11 text-[10px] text-xs md:text-sm flex flex-col md:justify-end">
                    Archive Of Ongr.
                </span>
            )}

        </Link>
    )
}

