import Link from "next/link";

export default function Footer() {
  return (
    <div className="mb-4 text-xs mx-auto my-12">
      Built with ❤️ by <Link href='https://x.com/seanoliver' className="font-semibold tracking-wide hover:underline">@SeanOliver</Link> in San Francisco.
    </div>
  )
}