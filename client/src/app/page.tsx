// import { FlipWords } from "@/components/flipwords";
// import { SparklesPreview } from "@/components/hero";
// import Logo from "@/components/icon";
import { PlaceholdersAndVanishInputDemo } from "@/components/PlaceholderInputElement";
import Navbar from "@/components/navbar";
// import { ModeToggle } from "@/components/theme_button";
// import { Button } from "@/components/ui/button";
// import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Home() {
  const words = ["better", "cute", "beautiful", "modern"];
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar className="top-2" />
      {/* <nav className="bg-white border-b-2 dark:bg-zinc-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo />
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="flex flex-row gap-5" id="navbar-default">
            <Button>Login</Button>
            <ModeToggle />
          </div>
        </div>
      </nav> */}
      <div className="w-full h-screen dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <PlaceholdersAndVanishInputDemo />
      </div>
    </main>
  );
}
