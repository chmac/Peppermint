import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArchiveIcon,
  FolderIcon,
  HomeIcon,
  MenuIcon,
  TicketIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";

import logo from "./pmint.svg";
import Create from "../ticket/Create";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon,
      current: location.pathname === "/" ? true : false,
    },
    {
      name: "Tickets",
      href: "/tickets",
      icon: TicketIcon,
      current: location.pathname === "/tickets" ? true : false,
    },
    {
      name: "History",
      href: "/history",
      icon: ArchiveIcon,
      current: location.pathname === "/history" ? true : false,
    },
    {
      name: "Notebook",
      href: "/notebook",
      icon: FolderIcon,
      current: location.pathname === "/notebook" ? true : false,
    },
  ];

  const secondaryNavigation = [
    {
      name: "Dashboard", href: "/admin/dashboard" },
    { name: "Clients", href: "/admin/clients" },
    { name: "Internal Users", href: "/admin/internal" },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img className="h-8 w-auto" src={logo} alt="Workflow" />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <Create />
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
                <div className={user.isAdmin ? "mt-8" : "hidden"}>
                  <h3
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="projects-headline"
                  >
                    Projects
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    aria-labelledby="projects-headline"
                  >
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="/settings" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <span className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                      <span className="text-sm font-medium leading-none text-white">
                        {user.firstName[0] + user.lastName[0]}
                      </span>
                    </span>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {user.firstName + " " + user.lastName}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex flex-shrink-0 px-4 align-middle flex-row">
                <img className="h-8 w-auto" src={logo} alt="Workflow" />
                <a href="https://pmint.dev" target="_blank" rel="noreferrer">
                  <h1 className="text-2xl ml-2 hover:text-green-600 font-extrabold">
                    Peppermint
                  </h1>
                </a>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                <Create />
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="mt-8">
                <h3
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="projects-headline"
                >
                  Admin
                </h3>
                <div
                  className="mt-1 space-y-1"
                  aria-labelledby="projects-headline"
                >
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="/settings" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <span className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                      <span className="text-sm font-medium leading-none text-white">
                        {user.firstName[0] + user.lastName[0]}
                      </span>
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none ">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
