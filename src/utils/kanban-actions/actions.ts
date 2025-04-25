"use server";

export type KanbanColumn = {
  id: number;
  title: string;
  order: number;
  tasks: KanbanTask[];
};

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

// Update the getKanbanData function with better error handling and fallback data
export async function getKanbanData() {
  // Always return mock data (no DB)
  return getMockKanbanData();
}

// Add a function to generate mock data when database is not available
function getMockKanbanData(): KanbanColumn[] {
  return [
    {
      id: 1,
      title: "To Do",
      order: 0,
      tasks: [
        {
          id: 1,
          title: "Fix login bug",
          description: "Users are unable to log in using their Google accounts",
          status: "todo",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          order: 0,
          user: {
            id: 1,
            name: "John Doe",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          tags: [
            {
              id: 1,
              name: "Bug",
              color: "#EF4444",
            },
            {
              id: 5,
              name: "High Priority",
              color: "#7C3AED",
            },
          ],
        },
        {
          id: 2,
          title: "Implement dark mode",
          description: "Add dark mode support to the application",
          status: "todo",
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          order: 1,
          user: {
            id: 2,
            name: "Jane Smith",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          tags: [
            {
              id: 2,
              name: "Feature",
              color: "#3B82F6",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      order: 1,
      tasks: [
        {
          id: 3,
          title: "Refactor authentication service",
          description: "Improve code quality and performance",
          status: "in_progress",
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          order: 0,
          user: {
            id: 3,
            name: "Bob Johnson",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          tags: [
            {
              id: 3,
              name: "Enhancement",
              color: "#10B981",
            },
          ],
        },
        {
          id: 4,
          title: "Update API documentation",
          description: "Document new endpoints and update examples",
          status: "in_progress",
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          order: 1,
          user: {
            id: 1,
            name: "John Doe",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          tags: [
            {
              id: 4,
              name: "Documentation",
              color: "#F59E0B",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Done",
      order: 2,
      tasks: [
        {
          id: 5,
          title: "Fix responsive layout issues",
          description: "Address layout problems on mobile devices",
          status: "done",
          dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          order: 0,
          user: {
            id: 2,
            name: "Jane Smith",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          tags: [
            {
              id: 1,
              name: "Bug",
              color: "#EF4444",
            },
          ],
        },
        {
          id: 6,
          title: "Optimize database queries",
          description: "Improve performance of slow queries",
          status: "done",
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          order: 1,
          user: {
            id: 3,
            name: "Bob Johnson",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          tags: [
            {
              id: 3,
              name: "Enhancement",
              color: "#10B981",
            },
          ],
        },
      ],
    },
  ];
}

// Update updateTaskStatus to always succeed (no DB)
export async function updateTaskStatus(
  taskId: number,
  columnId: number,
  order: number
) {
  return { success: true };
}

// Update updateTaskDetails to always succeed (no DB)
export async function updateTaskDetails(
  taskId: number,
  data: {
    title?: string;
    description?: string;
    dueDate?: Date | null;
    userId?: number | null;
  }
) {
  return { success: true };
}

// Update updateTaskTags to always succeed (no DB)
export async function updateTaskTags(taskId: number, tagIds: number[]) {
  return { success: true };
}

// Update addColumn to always succeed (no DB)
export async function addColumn(title: string) {
  return { success: true };
}

// Update updateColumnTitle to always succeed (no DB)
export async function updateColumnTitle(columnId: number, title: string) {
  return { success: true };
}

// Update deleteColumn to always succeed (no DB)
export async function deleteColumn(columnId: number) {
  return { success: true };
}

// Update addTask to always succeed (no DB)
export async function addTask(columnId: number, title: string) {
  return { success: true };
}

// Update deleteTask to always succeed (no DB)
export async function deleteTask(taskId: number) {
  return { success: true };
}

// Update getAllTags to always return mock tags (no DB)
export async function getAllTags() {
  return [
    { id: 1, name: "Bug", color: "#EF4444" },
    { id: 2, name: "Feature", color: "#3B82F6" },
    { id: 3, name: "Enhancement", color: "#10B981" },
    { id: 4, name: "Documentation", color: "#F59E0B" },
    { id: 5, name: "High Priority", color: "#7C3AED" },
  ];
}

// Update getAllUsers to always return mock users (no DB)
export async function getAllUsers() {
  return [
    {
      id: 1,
      name: "John Doe",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ];
}

// Update exportKanbanData to always return mock export data (no DB)
export async function exportKanbanData() {
  return getMockExportData();
}

// Add a function to generate mock export data
function getMockExportData() {
  return [
    {
      id: 1,
      title: "Fix login bug",
      description: "Users are unable to log in using their Google accounts",
      status: "todo",
      column: "To Do",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignee: "John Doe",
      tags: "Bug, High Priority",
    },
    {
      id: 2,
      title: "Implement dark mode",
      description: "Add dark mode support to the application",
      status: "todo",
      column: "To Do",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignee: "Jane Smith",
      tags: "Feature",
    },
    {
      id: 3,
      title: "Refactor authentication service",
      description: "Improve code quality and performance",
      status: "in_progress",
      column: "In Progress",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignee: "Bob Johnson",
      tags: "Enhancement",
    },
    {
      id: 4,
      title: "Update API documentation",
      description: "Document new endpoints and update examples",
      status: "in_progress",
      column: "In Progress",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignee: "John Doe",
      tags: "Documentation",
    },
    {
      id: 5,
      title: "Fix responsive layout issues",
      description: "Address layout problems on mobile devices",
      status: "done",
      column: "Done",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignee: "Jane Smith",
      tags: "Bug",
    },
    {
      id: 6,
      title: "Optimize database queries",
      description: "Improve performance of slow queries",
      status: "done",
      column: "Done",
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignee: "Bob Johnson",
      tags: "Enhancement",
    },
  ];
}
