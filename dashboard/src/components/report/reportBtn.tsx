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
    <Link href={link} className="bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800 flex w-fit">
      {children}
    </Link>
  );
}
