"use client";

import BoardCard from "@/components/BoardCard/BoardCard";
import { Board } from "@/utils/types/boards/boards";
import { Button } from "@/components/ui/button";
import { KanbanSquare, UserCircle2 } from "lucide-react";
import { useBoards } from "@/context/boards-context";
import { useEffect } from "react";
import { toast } from "sonner";

const Boards = () => {
  const { boards, setBoards } = useBoards();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/boards/getAllBoards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }

        const data = await response.json();
        setBoards(data);
      } catch (error) {
        toast.error("Failed to load boards. Please try again later.");
        console.error("Error fetching boards:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="ml-5">
      <h1 className="text-2xl my-5 font-thin font-[Raleway] w-full flex justify-center items-center h-[20vh]">
        Namaste Adarsh!{" "}
        <img src="/smile.png" width={"42rem"} className="ml-3" />
      </h1>
      <div></div>
      <div className="w-full h-28 flex flex-wrap gap-4">
        <div className="flex justify-between items-center gap-4">
          <KanbanSquare />
          <h1 className="font-bold font-[Raleway]">Your Boards</h1>
        </div>
        <BoardCard cards={boards} />
      </div>
    </div>
  );
};

export default Boards;
