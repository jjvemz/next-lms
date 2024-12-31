import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="">
      <UserButton
      afterSignOutUrl ="/" />
      prueba
    </div>
  )
}

export default Page;