import { XCircleIcon } from "@heroicons/react/20/solid";
import Navbar from "./Navbar";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

export default function Error() {
  const fallbackLinks: NavLink[] = [
    {
      id: 1,
      url: "/",
      newTab: false,
      text: "Home",
    },
  ];
  return (
    <html>
      <body>
        <Navbar
          links={fallbackLinks}
          logoUrl={null}
          logoText={"Frontend Error"}
        />

        <main className="min-h-screen flex flex-col dark:text-gray-100 dark:bg-black">
          <div className="w-full sm:max-w-lg mx-auto lg:max-w-5xl">
            <div className="p-4 bg-red-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h2 className="text-sm font-medium text-red-800">Something went wrong!</h2>
                  <div className="mt-2 text-sm text-red-700">
                    <ul role="list" className="pl-5 space-y-1 list-disc">
                      <li>Please try again</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
