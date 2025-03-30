import Link from "next/link";

export const PrivacyNotice = ({ className = "" }: { className?: string }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    Your data remains private.{" "}
    <Link
      href="/how-it-works"
      className="text-blue-600 hover:underline font-medium"
    >
      Learn how it works
    </Link>
  </p>
);
