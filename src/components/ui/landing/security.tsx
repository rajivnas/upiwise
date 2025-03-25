import {
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface SecurityItemProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function SecurityItem({ icon, title, text }: SecurityItemProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
}

export function SecurityBadges() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            Your Data is 100% Protected
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your financial data stays completely private
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <SecurityItem
            icon={<LockClosedIcon className="h-8 w-8" />}
            title="Local Processing"
            text="All analysis happens directly in your browser"
          />
          <SecurityItem
            icon={<ServerIcon className="h-8 w-8" />}
            title="No Cloud Storage"
            text="We never store your financial data anywhere"
          />
          <SecurityItem
            icon={<ShieldCheckIcon className="h-8 w-8" />}
            title="Privacy First Approach"
            text="Your data never leaves your device"
          />
        </div>
      </div>
    </section>
  );
}
