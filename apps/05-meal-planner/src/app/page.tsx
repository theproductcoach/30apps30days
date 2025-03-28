import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center my-8 md:my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4">
          Your Personal Meal Planner
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Plan your meals, manage your pantry, and discover new recipes based on
          your preferences and ingredients you already have.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-12">
        <FeatureCard
          title="Pantry Scanner"
          description="Scan and track your pantry items with our photo-based scanner."
          icon="/images/pantry-icon.svg"
          link="/pantry"
        />
        <FeatureCard
          title="Preference Quiz"
          description="Tell us what you like with our simple this-or-that questionnaire."
          icon="/images/preferences-icon.svg"
          link="/questionnaire"
        />
        <FeatureCard
          title="Weekly Meal Plan"
          description="Plan your entire week with one shopping trip."
          icon="/images/calendar-icon.svg"
          link="/plan"
        />
        <FeatureCard
          title="Tonight's Dinner"
          description="Need ideas for dinner tonight? We've got you covered."
          icon="/images/dinner-icon.svg"
          link="/dinner"
        />
      </div>

      <div className="bg-emerald-50 p-6 md:p-10 rounded-lg w-full max-w-6xl mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-gray-700 mb-6">
              Start by scanning your pantry, take our quick preference quiz, and
              we'll help you plan delicious meals that make the most of what you
              have.
            </p>
            <div className="flex gap-4">
              <Link href="/pantry">
                <Button variant="primary" size="lg">
                  Scan Your Pantry
                </Button>
              </Link>
              <Link href="/questionnaire">
                <Button variant="outline" size="lg">
                  Take the Quiz
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 bg-emerald-100 rounded-lg">
              {/* Placeholder for an illustration or screenshot */}
              <div className="absolute inset-0 flex items-center justify-center text-emerald-500 font-semibold">
                App Preview Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: string;
  link: string;
}) {
  return (
    <Link href={link} className="block">
      <div className="bg-white border border-gray-200 rounded-xl p-6 h-full transition-all hover:shadow-md hover:border-emerald-300">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          <div className="text-emerald-600 font-bold text-lg">
            {title.charAt(0)}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
