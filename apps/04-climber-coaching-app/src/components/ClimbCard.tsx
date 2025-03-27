import Link from "next/link";
import { Climb } from "@/types";

export default function ClimbCard({ climb }: { climb: Climb }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">{climb.name}</h2>
      <p className="text-gray-400">Grade: {climb.grade}</p>
      <Link
        href={`/progress/journal/${climb.id}`}
        className="text-green-500 hover:underline mt-2 block"
      >
        View Details
      </Link>
    </div>
  );
}
