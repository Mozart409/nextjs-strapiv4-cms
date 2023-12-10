import { XCircleIcon } from "@heroicons/react/20/solid";

export default function Error() {
  return (
    <>
      {
        /* <div className="container mx-auto p-8">
      <h2>Something went wrong!</h2>

    </div> */
      }
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h2 className="text-sm font-medium text-red-800">Something went wrong!</h2>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                <li>Please try again</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
