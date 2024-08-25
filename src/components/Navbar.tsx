import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("sign-in");
  }

  const store = await db.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6" />
        <div className="flex ml-auto items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
