"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Logo from "@/components/icon"
import { ModeToggle } from "@/components/theme_button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { useState } from "react"
import Markdown from 'react-markdown'
import { MathJaxContext, MathJax } from "better-react-mathjax";
import "./style.css";
interface IResponse {
    summary: string;
    mindmap: string | null;
}

export default function Component() {
    const [url, setUrl] = useState<string>("");
    const [notes, setNotes] = useState<string>("## No notes.....");
    const [loading, setLoading] = useState(false);
    const getNotes = async () => {
        setLoading(true)
        setNotes('');
        const resp = await fetch(`http://127.0.0.1:8080/get-detailed-notes/?url=${url}`);
        const data: IResponse = await resp.json();
        setNotes(data.summary);
        setLoading(false);
    }
    const config = {
        loader: { load: ["[tex]/html"] },
        tex: {
            packages: { "[+]": ["html"] },
            inlineMath: [["$", "$"]],
            displayMath: [["$$", "$$"]],
        },
    };
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden w-64 dark:bg-gray-900 p-6 lg:block">
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                        {/* <img src="/placeholder.svg" alt="@shadcn" /> */}
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="dark:text-white">John Doe</div>
                </div>
                <nav className="mt-8 space-y-2">
                    <Link
                        href="#"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                        prefetch={false}
                    >
                        <HomeIcon className="h-5 w-5" />
                        Home
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-white"
                        prefetch={false}
                    >
                        <VideoIcon className="h-5 w-5" />
                        Create Notes
                    </Link>
                    
                </nav>

            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-950">
                <header className="bg-white dark:bg-gray-900 shadow">
                    <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            <Logo />
                        </div>

                        <div className="flex gap-2">
                            <ModeToggle />
                            <Button variant="ghost" size="icon">
                                <LogOutIcon className="h-5 w-5" />
                                <span className="sr-only">Logout</span>
                            </Button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 container mx-auto py-4  px-4 md:px-6">
                    <div className="grid md:grid-cols-[0.5fr_1.5fr] gap-8 h-max-3/4">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="video-url">Video URL</Label>
                                    <Input value={url} onChange={(e) => setUrl(e.target.value)} id="video-url" placeholder="Enter a video URL" className="mt-1 rounded-full" />
                                </div>
                                {/* <Button className="w-full">Summarize</Button> */}
                                <div className="flex justify-center text-center">
                                    <HoverBorderGradient
                                        containerClassName="rounded-full w-full py-1"
                                        as="button"
                                        onClick={getNotes}
                                        className="bg-black text-white flex items-center space-x-2 disabled"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg>
                                        <span>Generate Notes</span>
                                    </HoverBorderGradient>
                                </div>
                            </div>
                            <br />
                            <div className="space-y-4">
                                {
                                    url !== '' ? <img alt="" className="w-full rounded-lg" src={`https://i.ytimg.com/vi/${url.split("=")[1]}/mqdefault.jpg`} /> : <></>
                                }
                            </div>
                        </div>
                        <div className="h-[600px] justify-center items-center bg-white dark:bg-gray-900 rounded-lg shadow p-6 overflow-y-scroll">

                            {
                                loading ? <div className="loader mx-auto">
                                    <div className="justify-content-center jimu-primary-loading"></div>
                                </div> : <></>
                            }
                            <MathJaxContext config={config}>
                                <MathJax dynamic hideUntilTypeset="every">
                                    <Markdown className="prose lg:prose-xl dark:prose-invert">
                                        {notes}

                                    </Markdown>
                                </MathJax>
                            </MathJaxContext>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function BarChartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
        </svg>
    )
}


function HomeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function LogOutIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    )
}


function MenuIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function SettingsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function VideoIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
    )
}