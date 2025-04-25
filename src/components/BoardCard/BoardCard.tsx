import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, PlusCircle } from "lucide-react";
import { formatLastActivity } from "@/utils/format-last-active/formatLastActivity";
import { Board } from "@/utils/types/boards/boards";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoardCard({ cards }: { cards: Board[] }) {
  // Check if cards array contains any empty IDs (loading state)
  const isLoading = cards.some((card) => card.id === "");

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
      <Card className="w-[18rem] h-[15rem] mt-1 overflow-hidden">
        <div className="flex items-center gap-3 justify-center h-full w-full translate-y-[-0.5rem]">
          <PlusCircle className="h-6 w-6 text-gray-400" />
          <div className="text-sm text-gray-400">Create new board</div>
        </div>
      </Card>
      {cards.map((board) => (
        <a key={board.id} href={`/boards/${board.id}`}>
          <Card className="w-[18rem] h-[15rem] mt-1 overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-start">
              {/* <Badge variant="outline" className="text-xs">
              {board.category || "General"}
            </Badge> */}
              <div className="flex items-center  text-xs">
                <Clock className="h-4 w-4 mr-1" />
                {formatLastActivity(board.last_activity)}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="font-bold text-xs leading-tight">{board.title}</p>
              <p className="text-xs leading-relaxed ">{board.description}</p>
              <div className="flex flex-wrap gap-1">
                {board.labels.map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div>
                <p className="text-xs font-medium">{board.author}</p>
              </div>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}
