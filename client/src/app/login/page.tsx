"use client"
import { BackgroundGradient } from '@/components/ui/background-gradient'
import Image from 'next/image'
import React from 'react'

const Login = () => {
    return (
        <div className="w-full h-screen dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div>
                <BackgroundGradient className="rounded-[22px] max-w-sm p-2 sm:p-5 bg-white dark:bg-zinc-900">
                    <button className="dark:bg-zinc-900 p-8  text-lg  rounded-xl">
                        <Image
                            className="mx-auto mb-3"
                            src="/google_logo.png"
                            width={100}
                            height={100}
                            alt="Google logo"
                        />
                        <span className='dark:text-white'> Sign in with Google</span>
                    </button>
                </BackgroundGradient>
            </div>
        </div>
    )
}

export default Login
