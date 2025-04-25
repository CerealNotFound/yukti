"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
// import type { KanbanColumn } from "@/lib/actions/kanban-actions"

export type KanbanTask = {
    id: number;
    title: string;
    description: string | null;
    status: "todo" | "in_progress" | "done";
    dueDate: Date | null;
    order: number;
    user: {
      id: number;
      name: string;
      avatarUrl: string | null;
    } | null;
    tags: {
      id: number;
      name: string;
      color: string;
    }[];
  };

export type KanbanColumn = {
  id: number;
  title: string;
  order: number;
  tasks: KanbanTask[];
};

type KanbanContextType = {
  columns: KanbanColumn[];
  setColumns: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
  filters: {
    tags: number[];
    users: number[];
    dueDate: "all" | "overdue" | "today" | "upcoming";
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      tags: number[];
      users: number[];
      dueDate: "all" | "overdue" | "today" | "upcoming";
    }>
  >;
  filteredColumns: KanbanColumn[];
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export function KanbanProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: KanbanColumn[];
}) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialData);
  const [filters, setFilters] = useState({
    tags: [] as number[],
    users: [] as number[],
    dueDate: "all" as "all" | "overdue" | "today" | "upcoming",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply filters to columns
  const filteredColumns = columns.map((column) => {
    const filteredTasks = column.tasks.filter((task) => {
      // Filter by tags
      const tagMatch =
        filters.tags.length === 0 ||
        task.tags.some((tag) => filters.tags.includes(tag.id));

      // Filter by users
      const userMatch =
        filters.users.length === 0 ||
        (task.user && filters.users.includes(task.user.id));

      // Filter by due date
      let dueDateMatch = true;
      if (filters.dueDate !== "all" && task.dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);

        if (filters.dueDate === "overdue") {
          dueDateMatch = taskDate < today;
        } else if (filters.dueDate === "today") {
          dueDateMatch = taskDate.getTime() === today.getTime();
        } else if (filters.dueDate === "upcoming") {
          dueDateMatch = taskDate >= today;
        }
      }

      return tagMatch && userMatch && dueDateMatch;
    });

    return {
      ...column,
      tasks: filteredTasks,
    };
  });

  // Effect to toggle dark mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <KanbanContext.Provider
      value={{
        columns,
        setColumns,
        filters,
        setFilters,
        filteredColumns,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }
  return context;
}
