import Link from "next/link";
import { GithubIcon, TwitterIcon, MailIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <span className="text-gray-900 dark:text-white font-semibold text-lg">
                UPIWise
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Privacy-first UPI analytics powered by AI
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-medium mb-2">
              Resources
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/docs" text="Documentation" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/support" text="Support" />
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-medium mb-2">
              Legal
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy" text="Privacy Policy" />
              <FooterLink href="/terms" text="Terms of Service" />
              <FooterLink href="/security" text="Security" />
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-medium mb-2">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              <SocialLink
                href="https://github.com/yourusername"
                icon={<GithubIcon className="h-5 w-5" />}
                label="GitHub"
              />
              <SocialLink
                href="https://twitter.com/yourhandle"
                icon={<TwitterIcon className="h-5 w-5" />}
                label="Twitter"
              />
              <SocialLink
                href="mailto:hello@upitrack.in"
                icon={<MailIcon className="h-5 w-5" />}
                label="Email"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} UPIWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
      >
        {text}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
