import { RocketIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <p className='animate-bounce'><RocketIcon /></p>
      <p>Loading...</p>
    </div>
  )
}