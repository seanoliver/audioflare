import { FileIcon, GitHubLogoIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator"

export default function Header() {
  return (
    <SeparatorDemo />
  )
}

export function SeparatorDemo() {
  return (
    <div className="flex flex-col items-center my-20">
      <div className='h-1'></div>
      <div className="space-y-1">
        <h4 className="text-lg font-semibold leading-none text-center">Audioflare</h4>
        <p className="text-sm text-muted-foreground text-center">
          Transcribe, Analyze, Translate: All in One Cloudflare Playground
        </p>
      </div>

      <div className="flex h-5 items-center space-x-4 text-sm mt-4">
        <Button variant="link"><QuestionMarkCircledIcon className="mr-2"/> FAQ</Button>
        <Button variant="link"><GitHubLogoIcon className="mr-2" /> Source</Button>
        <Button variant="link"><FileIcon className="mr-2" />Cloudflare Docs</Button>
      </div>
    </div>
  )
}
