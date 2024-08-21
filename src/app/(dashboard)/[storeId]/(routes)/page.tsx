import db from "@/lib/db";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params,
}) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <>
      <div>Active store = {store?.name}</div>
      <div>Active store = {store?.id}</div>
      <div>Active store = {store?.createdAt.toString()}</div>
      <div>Active store = {store?.updatedAt.toString()}</div>
      <div>Active store = {store?.userId}</div>
    </>
  );
};

export default DashboardPage;
