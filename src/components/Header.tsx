
import React from 'react'
import Logo from './Logo';
import Navigator from './Navigator';




export default function Header() {

    return (
        <header className='w-full sm:flex-col flex-row flex-center fixed top-0 right-11 inset-x-0'>
            {/* <Logo /> */}
            <Logo showText={false} />
            <Navigator />
        </header>
    )
}

