"use client"
import React from 'react'
import { useTheme } from "next-themes";
const Logo = () => {
    const { theme } = useTheme();
    return (
        <img src={theme === "dark" ||theme === "system" ? "./clip2note_dark.png" : "./clip2note_light.png"} className="h-10" alt="Flowbite Logo" />
    )
}

export default Logo
