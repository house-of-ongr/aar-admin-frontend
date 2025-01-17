
import React from 'react'
import Logo from './Logo';
import Navigator from './Navigator';




export default function Header() {

    return (
        <header className='w-full flex md:flex-col flex-row justify-center items-center gap-3 md:justify-between fixed top-0 right-11 inset-x-0 md:pb-5 sm:pb-2 border-b-[1px]  bg-white z-10 '>
            <Logo showText={false} />
            <Navigator />
        </header>
    )
}

