"use client";

import HeadingUi from "@/components/Heading-Ui";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const BannerClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingUi
          title="banner"
          description="atur banner untuk toko"
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/banners/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BannerClient;
