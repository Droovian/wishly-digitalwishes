"use client";

import React from "react";
import { Cover } from "@/components/ui/cover";
import BorderButton from "./BorderButton";

export function CoverDemo() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-20 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Old invites don't cut it anymore <br /> we <Cover>bring them to life.</Cover>
      </h1>

     <div className="flex justify-center mt-5">
      <p className="text-black font-medium text-lg sm:w-1/2 text-center">
        Create personalized digital invitations for birthdays, events or anything you'd like.
        Share them effortlessly with friends and family. Create memories that last a lifetime.
      </p>
     </div>

     <div className="flex justify-center mt-10">
         <BorderButton onClick={() => {}} text="Get started" />
     </div>
    </div>
  );
}
