import React from "react";

interface HeadingUiProps {
  title: string;
  description: string;
}

const HeadingUi: React.FC<HeadingUiProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default HeadingUi;
