import Link from "next/link";

export function ReportBtn({
  id,
  link,
  children,
}: {
  id: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={link} className="bg-green-600 p-2 rounded hover:bg-green-700 ">
      {children}
    </Link>
  );
}
