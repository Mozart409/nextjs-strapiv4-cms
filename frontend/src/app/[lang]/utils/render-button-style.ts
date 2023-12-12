export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900 text-white bg-primary-400";
    case "secondary":
      return "px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900";
    default:
      return "px-8 py-3 text-lg font-semibold border-2 rounded dark:border-gray-100 border-indigo-600 bg-gray-100";
  }
}
