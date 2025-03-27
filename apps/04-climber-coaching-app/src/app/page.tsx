"use client";
import Link from "next/link";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg overflow-hidden my-8 bg-gray-800 animate-pulse" />
  ),
});

const ClimbingLocations = [
  { name: "Coolum, Australia", coords: [-26.5283, 153.09] },
  { name: "Blue Mountains, Australia", coords: [-33.6333, 150.3] },
  { name: "Grampians, Australia", coords: [-37.3017, 142.5795] },
  { name: "Frankenjura, Germany", coords: [49.7274, 11.3389] },
  { name: "Flatanger, Norway", coords: [64.4969, 10.8806] },
  { name: "Lofoten, Norway", coords: [68.2345, 14.5636] },
  { name: "Arco, Italy", coords: [45.9212, 10.884] },
  { name: "Hong Kong", coords: [22.3193, 114.1694] },
  { name: "Chulilla, Spain", coords: [39.65, -0.9833] },
];

function WorldMapComponent() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden my-8">
      {/* MapContainer component will be dynamically imported */}
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Will Chan Climbing Coach
        </h1>
        <p className="text-xl text-gray-300">
          Your personal guide to becoming a better climber. Expert coaching,
          personalised advice, and a community of climbers.
        </p>
      </div>

      <div className="space-y-8 mb-16">
        <div className="card">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">About Me</span>
            <div className="h-px flex-grow bg-gradient-to-r from-green-500/50 to-transparent ml-4" />
          </h2>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              Hi, I'm Will Chan, a passionate climber and coach with 17 years of
              experience in both indoor and outdoor climbing. Based in London,
              I've had the privilege of climbing across multiple continents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Experience</h3>
                <ul className="list-none space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">⭐</span>
                    Sport climbing up to 5.13c / 8b+
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">⭐</span>
                    Bouldered up to V12
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Current Base
                </h3>
                <p className="flex items-center">
                  <span className="text-green-500 mr-2">📍</span>
                  London, United Kingdom
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                Global Climbing Experience
              </h3>
              <WorldMap />
            </div>

            <p className="text-lg border-l-2 border-green-500 pl-4 mt-8">
              My coaching philosophy focuses on building strong foundations,
              developing proper technique, and fostering a deep understanding of
              climbing movement. With nearly two decades of experience, I've
              helped countless climbers achieve their goals and push their
              limits safely and effectively.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">Why Choose Me?</span>
            <div className="h-px flex-grow bg-gradient-to-r from-green-500/50 to-transparent ml-4" />
          </h2>
          <div className="space-y-4 text-gray-300">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Personalised training plans based on your goals and current
                level
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Focus on injury prevention and proper technique
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Specialised in sport climbing and bouldering
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Flexible scheduling and both indoor/outdoor options
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Link
          href="/blog"
          className="card group block hover:border-green-500/50 transition-colors duration-200"
        >
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-500 transition-colors duration-200">
            Climbing Tips & Advice
          </h3>
          <p className="text-gray-300">
            Expert guidance on technique, training, and climbing strategies
          </p>
        </Link>

        <Link
          href="/booking"
          className="card group block hover:border-green-500/50 transition-colors duration-200"
        >
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-500 transition-colors duration-200">
            Book a Session
          </h3>
          <p className="text-gray-300">
            Schedule a personalised coaching session
          </p>
        </Link>

        <Link
          href="/qa"
          className="card group block hover:border-green-500/50 transition-colors duration-200"
        >
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-500 transition-colors duration-200">
            Ask Questions
          </h3>
          <p className="text-gray-300">
            Get answers to your climbing questions
          </p>
        </Link>

        <Link
          href="/progress"
          className="card group block hover:border-green-500/50 transition-colors duration-200"
        >
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-500 transition-colors duration-200">
            Track Progress
          </h3>
          <p className="text-gray-300">
            Monitor your climbing journey and achievements
          </p>
        </Link>
      </div>
    </div>
  );
}
