"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Copy, CopyCheck, Server } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { UseOrigin } from "@/hooks/use-origin";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<
  ApiAlertProps["variant"],
  BadgeProps["variant"]
> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant,
}) => {
  const { toast } = useToast();
  const origin = UseOrigin();

  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast({
      title: "Done",
      description: "Mau buat apaan dah ngopi ginian",
      variant: "default",
    });
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <div className="relative rounded-md bg-muted px-[0.5rem] py-[0.5rem] font-mono text-sm font-thin">
          {description}
        </div>
        <Button variant={"outline"} onClick={onCopy}>
          <Copy size={15} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
