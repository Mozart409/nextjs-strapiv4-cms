"use client";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="p-4 dark:text-gray-100 dark:bg-black">
      <div className="container flex justify-between px-0 mx-auto h-16 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="hidden flex-shrink-0 items-center lg:flex">
          <ul className="hidden items-stretch space-x-3 lg:flex">
            {links.map((item: NavLink) => <NavLink key={item.id} {...item} />)}
          </ul>
        </div>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="overflow-y-auto fixed inset-y-0 z-50 py-6 px-6 w-full sm:max-w-sm sm:ring-1 dark:bg-black rtl:left-0 ltr:right-0 sm:ring-gray-100/10">
            <div className="flex justify-between items-center">
              <a href="#" className="p-1.5 -m-1.5">
                <span className="sr-only">Strapi</span>
                {logoUrl
                  && (
                    <img
                      className="w-auto h-8"
                      src={logoUrl}
                      alt=""
                    />
                  )}
              </a>
              <button
                type="button"
                className="p-2.5 -m-2.5 text-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-200/10">
                <div className="py-6 space-y-2">
                  {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        <button
          className="p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="w-7 h-7 text-gray-100" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
