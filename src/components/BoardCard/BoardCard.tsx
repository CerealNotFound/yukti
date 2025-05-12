"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Loader2, PlusCircle } from "lucide-react";
import { formatLastActivity } from "@/utils/format-last-active/formatLastActivity";
import { Board, BoardWithAuthor } from "@/utils/types/boards/boards";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUser } from "@/context/user-context";

export default function BoardCard({ cards }: { cards: BoardWithAuthor[] }) {
  const [createBoardIsOpen, setCreateBoardIsOpen] = useState(false);
  const isLoading = cards.some((card) => card.id === "");
  const [createBoardIsLoading, setCreateBoardIsLoading] = useState(false);
  const { user } = useUser();

  const truncateDescription = (description: string) => {
    if (description.length > 70) {
      return description.slice(0, 70) + "...";
    }
    return description;
  };

  const handleCreateBoard = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreateBoardIsLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      who_can_see: formData.get("who_can_see"),
      labels: (formData.get("labels") as string)
        .split(",")
        .map((label) => label.trim()),
      category: formData.get("category"),
      author: user?.id,
    };

    const createBoardPromise = async () => {
      try {
        const response = await fetch("/api/boards/createBoard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status !== 201) {
          throw new Error("Failed to create board");
        }
        const result = await response.json();
        console.log(result);
        setCreateBoardIsLoading(false);
        return result;
      } catch (error) {
        console.error("Error creating board:", error);
        throw error;
      } finally {
        setCreateBoardIsLoading(false);
        setCreateBoardIsOpen(false);
      }
    };
    toast.promise(createBoardPromise(), {
      loading: "Creating board...",
      success: () => "Board created successfully! 🔥",
      error: "Failed to create board",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-5">
        {[1, 2, 3].map((_, index) => (
          <Card key={index} className="w-[18rem] h-[15rem] mt-1">
            <CardHeader>
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 cursor-pointer">
      <Dialog open={createBoardIsOpen} onOpenChange={setCreateBoardIsOpen}>
        <DialogTrigger asChild>
          <Card className="w-[18rem] h-[15rem] mt-1 overflow-hidden">
            <div className="flex items-center gap-3 justify-center h-full w-full translate-y-[-0.5rem]">
              <PlusCircle className="h-6 w-6 text-gray-400" />
              <div className="text-sm text-gray-400">Create new board</div>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Board</DialogTitle>
            <DialogDescription>
              Create a new board to manage your tasks and projects.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateBoard}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter board title"
                  className="col-span-3"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your board"
                  className="col-span-3 h-20"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="who_can_see" className="text-right">
                  Visibility
                </Label>
                <Select name="who_can_see" disabled={isLoading} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select who can see this board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="labels" className="text-right">
                  Labels
                </Label>
                <Input
                  id="labels"
                  name="labels"
                  placeholder="Enter comma-separated labels"
                  className="col-span-3"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Enter board category"
                  className="col-span-3"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {createBoardIsLoading ? (
                  <span>
                    Creating...
                    <Loader2 className="animate-spin h-4 w-4 ml-2" />
                  </span>
                ) : (
                  "Create Board"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {cards.map((board) => (
        <a key={board.id} href={`/boards/${board.id}`}>
          <Card className="w-[18rem] h-[15rem] mt-1 overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-start">
              <div className="flex items-center  text-xs">
                <Clock className="h-4 w-4 mr-1" />
                {formatLastActivity(board.last_activity)}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="font-bold text-xs leading-tight">{board.title}</p>
              <p className="text-xs leading-relaxed ">
                {truncateDescription(board.description)}
              </p>
              <div className="flex flex-wrap gap-1">
                {board.labels.map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="mb-2">
                <p className="text-xs font-medium">{board.users.name}</p>
                <p className="text-xs text-gray-400">{board.users.email}</p>
              </div>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}
