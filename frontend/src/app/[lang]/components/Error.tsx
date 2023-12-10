import { XCircleIcon } from "@heroicons/react/20/solid";

export default function Error() {
  return (
    <>
      {
        /* <div className="container p-8 mx-auto">
      <h2>Something went wrong!</h2>

    </div> */
      }
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
    </>
  );
}
