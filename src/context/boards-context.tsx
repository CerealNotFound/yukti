"use client";

import { createContext, useContext, useState } from "react";
import type { Board } from "@/utils/types/boards/boards";

type BoardsContextType = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
};

const initialBoards: Board[] = [
  {
    id: "",
    title: "",
    description: "",
    created_at: "",
    last_activity: "",
    author: "",
    who_can_see: "everyone",
    labels: [],
    is_starred: false,
    status: "active",
    category: "",
  },
];

const BoardsContext = createContext<BoardsContextType | undefined>(undefined);

export function BoardsProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<Board[]>(initialBoards);

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  );
}

export function useBoards() {
  const context = useContext(BoardsContext);
  if (context === undefined) {
    throw new Error("useBoards must be used within a BoardsProvider");
  }
  return context;
}
