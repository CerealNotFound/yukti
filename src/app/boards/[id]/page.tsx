import { KanbanBoard } from "@/components/Kanban/kanban-board";
import { KanbanProvider } from "@/context/kanban-context";
import { getKanbanData } from "@/utils/kanban-actions/actions";

export default async function Board() {
  const data = await getKanbanData();

  return (
    <KanbanProvider initialData={data}>
      <KanbanBoard />
    </KanbanProvider>
  );
}
