
import Link from "next/link";
import RecentPolls from "@/app/components/RecentPolls";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">
          QuickPoll - Vote Instantly!
        </h1>
        <p className="text-lg text-gray-700 max-w-xl">
          Create polls and vote in real-time with QuickPoll. Simple, fast, and effective!
        </p>

        <div className="mt-6 flex space-x-4">
          <Link href="/create">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
              Create a Poll
            </button>
          </Link>
          <Link href="/results">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg">
              View Results
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Polls Section */}
      <div className="mt-10">
        <RecentPolls />
      </div>
    </div>
  );
}
