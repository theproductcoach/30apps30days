interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-gradient-to-br from-black to-red-950/50 hover:from-red-950/50 hover:to-black rounded-2xl p-6 transition-all duration-300">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-4 shadow-lg shadow-red-900/50 ring-1 ring-red-900/50">
            <span className="text-3xl">{icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-red-200">
              {title}
            </h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
