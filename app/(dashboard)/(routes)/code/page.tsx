import React from "react";

import Heading from "@/components/non-shadcn/Heading";
import { Code } from "lucide-react";

const CodePage = () => {
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Our most advanced code generation model"
        icon={Code}
        iconColor= "text-green-700"
        bgColor= "bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        hello world!
      </div>
    </div>
  );
};

export default CodePage;