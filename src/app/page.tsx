import { useAuth, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="mx-auto h-screen flex flex-col justify-center items-center gap-2">
        <UserButton afterSwitchSessionUrl="/sign-in" />
      </div>
    </>
  );
}
