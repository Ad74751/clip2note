"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <div className="flex flex-col justify-center  items-center px-4">
            <div className="flex flex-col mb-5">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-cyan-500 to-sky-700  bg-opacity-50">
                    Spotlight <br /> is the new trend.
                </h1>
                <p className="mt-4 font-normal text-base text-zinc-500 dark:text-neutral-300 max-w-lg text-center mx-auto">
                    Spotlight effect is a great way to draw attention to a specific part
                    of the page. Here, we are drawing the attention towards the text
                    section of the page. I don&apos;t know why but I&apos;m running out of
                    copy.
                </p>
            </div>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
          
        </div>
    );
}
