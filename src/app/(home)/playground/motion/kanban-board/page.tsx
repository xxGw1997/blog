import React from "react";
import { KanbanBoard } from "~/components/playground/motion/kanban-board";

const Page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <KanbanBoard />
    </div>
  );
};

export default Page;
