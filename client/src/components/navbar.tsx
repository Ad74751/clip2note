"use client"
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbarmenu";
import { cn } from "../lib/utils";
import { useState } from "react";
import Logo from "./icon";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme_button";
import Link from "next/link";
function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-5xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <Logo />
                <div className="flex gap-2">
                    <Link href={"/login"}>
                        <Button>Login</Button>
                    </Link>
                    <ModeToggle />
                </div>
            </Menu>
        </div>
    );
}
export default Navbar;