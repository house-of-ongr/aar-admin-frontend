import Link from 'next/link';
import React from 'react'



const TABS = [
    { label: "예약", href: "/reservation" },
    { label: "음원", href: "/soundsource" },
    { label: "사용자", href: "/user-list" },
    { label: "하우스", href: "/house" },
];

const Navigator = () => {

    return (
        <nav className='w-full flex-center text-sm'><ul className='flex gap-5 md:gap-10 lg:gap-16'>{TABS.map(({ label, href }) => {
            return (<li key={label}>{<Link href={href}>{label}</Link>}</li>)
        })}</ul>
        </nav>
    )
}

export default Navigator