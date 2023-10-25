import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-xs mx-auto py-12">
      Built with ❤️ by <Link href='https://x.com/seanoliver' className="font-semibold tracking-wide hover:border-b-2">@SeanOliver</Link> in San Francisco.
    </div>
  )
}