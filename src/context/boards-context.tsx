"use client";

import { createContext, useContext, useState } from "react";
import type { Board, BoardWithAuthor } from "@/utils/types/boards/boards";

type BoardsContextType = {
  boards: BoardWithAuthor[];
  setBoards: React.Dispatch<React.SetStateAction<BoardWithAuthor[]>>;
};

const initialBoards: BoardWithAuthor[] = [
  {
    id: "",
    title: "",
    description: "",
    created_at: "",
    last_activity: "",
    who_can_see: "everyone",
    labels: [],
    is_starred: false,
    status: "active",
    category: "",
    users: {
      name: "",
      email: "",
    },
  },
];

const BoardsContext = createContext<BoardsContextType | undefined>(undefined);

export function BoardsProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<BoardWithAuthor[]>(initialBoards);

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
