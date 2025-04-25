"use client";

import type React from "react";

import { useState } from "react";
import { Column } from "./column";
import { FilterBar } from "./filter-bar";
import { useKanban } from "@/context/kanban-context";
import {
  updateTaskStatus,
  exportKanbanData,
} from "@/utils/kanban-actions/actions";

export function KanbanBoard() {
  const { filteredColumns, setColumns } = useKanban();
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent,
    taskId: number,
    columnId: number
  ) => {
    setDraggedTaskId(taskId);
    setSourceColumnId(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetColumnId: number) => {
    e.preventDefault();

    if (draggedTaskId === null || sourceColumnId === null) return;

    // Find the task in the source column
    const sourceColumn = filteredColumns.find(
      (col) => col.id === sourceColumnId
    );
    if (!sourceColumn) return;

    const taskIndex = sourceColumn.tasks.findIndex(
      (task) => task.id === draggedTaskId
    );
    if (taskIndex === -1) return;

    const task = sourceColumn.tasks[taskIndex];

    // Calculate new order in target column
    const targetColumn = filteredColumns.find(
      (col) => col.id === targetColumnId
    );
    if (!targetColumn) return;

    const newOrder = targetColumn.tasks.length;

    // Update task status in the database
    const result = await updateTaskStatus(
      draggedTaskId,
      targetColumnId,
      newOrder
    );

    if (result.success) {
      // Update local state
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          // Remove task from source column
          if (column.id === sourceColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter((t) => t.id !== draggedTaskId),
            };
          }

          // Add task to target column
          if (column.id === targetColumnId) {
            // Determine the new status based on the column
            let newStatus: "todo" | "in_progress" | "done";
            if (column.title.toLowerCase().includes("do")) {
              newStatus = "todo";
            } else if (column.title.toLowerCase().includes("progress")) {
              newStatus = "in_progress";
            } else {
              newStatus = "done";
            }

            return {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  ...task,
                  status: newStatus,
                  columnId: targetColumnId,
                  order: newOrder,
                },
              ],
            };
          }

          return column;
        });
      });
    }

    setDraggedTaskId(null);
    setSourceColumnId(null);
  };

  const handleExport = async () => {
    try {
      const data = await exportKanbanData();

      // Convert data to CSV
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((row) => Object.values(row).join(","));
      const csv = [headers, ...rows].join("\n");

      // Create a blob and download
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kanban-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <FilterBar onExport={handleExport} />
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex space-x-4 min-h-[calc(100vh-10rem)]">
          {filteredColumns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
