import { Separator } from "./ui/separator"

export default function Header() {
  return (
    <SeparatorDemo />
  )
}

export function SeparatorDemo() {
  return (
    <div className="flex flex-col items-center mt-20">
      <div className='h-1'></div>
      <div className="space-y-1">
        <h4 className="text-lg font-semibold leading-none text-center">Cloudflare AI Workers Playground</h4>
        <p className="text-sm text-muted-foreground text-center">
          An open-source playground app for learning to work with Cloudflare's AI Workers.
        </p>
      </div>
      <Separator className="my-4 w-1/2" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>What is this?</div>
        <Separator orientation="vertical" />
        <div>Github Repo</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
