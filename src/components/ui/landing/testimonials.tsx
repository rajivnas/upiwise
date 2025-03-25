"use client";

function TestimonialItem({
  text,
  author,
  isReverse,
}: {
  text: string;
  author: string;
  isReverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Testimonial Card */}
      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-xl w-full">
        {/* Quotation Mark */}
        <div className="text-4xl absolute -top-4 left-6 text-blue-100 dark:text-blue-900/50">
          &ldquo;
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {text}
        </p>
      </div>

      {/* Author Profile */}
      <div
        className={`flex items-center gap-4 ${
          isReverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
          <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
            {author.charAt(0)}
          </span>
        </div>
        <div className={`text-left ${isReverse ? "md:text-right" : ""}`}>
          <p className="font-semibold text-gray-900 dark:text-white">
            {author}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Verified User
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Trusted by
            <span className="text-blue-600 dark:text-blue-400 ml-2">
              Financial Experts
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands who transformed their money management
          </p>
        </div>

        <div className="space-y-16">
          <TestimonialItem
            text="The privacy-first approach gave me complete control over my financial data while providing powerful insights. A rare combination in today's world."
            author="Rahul S."
            isReverse
          />
          <TestimonialItem
            text="Reduced my unnecessary expenses by 40% in the first month itself. The spending pattern analysis is incredibly accurate."
            author="Priya M."
          />
          <TestimonialItem
            text="As a developer, I appreciate the local processing architecture. Finally a financial tool that respects user privacy."
            author="Arjun K."
            isReverse
          />
        </div>
      </div>
    </section>
  );
}
