import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export function UpiSecurityStatus() {
  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
      <ShieldCheckIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
      <span className="text-sm text-green-700 dark:text-green-400">
        All data processed locally - 100% private
      </span>
    </div>
  );
}
