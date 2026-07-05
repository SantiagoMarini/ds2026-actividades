import {Footer} from './Footer'
import {Header} from './Header'
import {type ReactNode} from 'react'

export interface LayoutProps{ children: ReactNode };

export function Layout( {children}: LayoutProps){
    return (
        <div className='h-min-screen'>
            <Header />
                <div className='w-full'>{children}</div>
            <Footer />
        </div>
    );

}