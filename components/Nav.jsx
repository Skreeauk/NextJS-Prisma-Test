'use client'

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { ThemeButton } from "./ThemeButton";

export function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    setUpProviders();
  }, [])

  return (
    <nav className="flex flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image width={30} height={30} src="/images/logo.svg" className="object-contain" alt="Promptopia"/>
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? 
        (
          <div className="flex gap-3 md:gap-5">
            <ThemeButton />

            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className="outline_btn">Sign Out</button>

            <Link href="/profile">
              <Image width={37} height={37} src={session?.user.image} className="rounded-full" alt="profile"/>
            </Link>
          </div>
        ) : 
        (
          <div className="flex gap-3">
            <ThemeButton />

            { providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? 
        (
          <div className="flex gap-3">
            <ThemeButton />

            <Image width={37} height={37} src={session?.user.image} className="rounded-full" onClick={() => {setToggleMenu((prev) => !prev)}} alt="profile"/>
          
            { toggleMenu && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleMenu(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleMenu(false)}>
                  Create Prompt
                </Link>
                <button 
                  type="button" 
                  onClick={() => {
                    setToggleMenu(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn dark:border-white"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : 
        (
          <div className="flex gap-3">
            <ThemeButton />

            { providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}