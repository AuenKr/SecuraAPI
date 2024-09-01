import { Card, CardContent } from "@/components/ui/card";
import { DashBoardTable } from "@/components/dashboard/table";
import { sideBarConfig as config } from "@/components/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session?.user) redirect("/");
  return (
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{config.header.title}</h1>
      </header>
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Total APIs</h2>
            <p className="text-3xl font-bold">{config.stats.totalAPIs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Critical APIs</h2>
            <p className="text-3xl font-bold">{config.stats.criticalAPIs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Tested APIs (Coverage)</h2>
            <p className="text-3xl font-bold">
              {config.stats.testedAPIsCoverage}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">
              Sensitive in response APIs
            </h2>
            <p className="text-3xl font-bold">
              {config.stats.sensitiveInResponseAPIs}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 text-xl">{config.tabs[0]}</div>
      </div>
      <DashBoardTable />
    </main>
  );
}

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
