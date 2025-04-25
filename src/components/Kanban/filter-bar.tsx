"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getAllTags, getAllUsers } from "@/utils/kanban-actions/actions"
import { useKanban } from "@/context/kanban-context"
import { Filter, Download, Plus, Moon, Sun } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { addColumn } from "@/utils/kanban-actions/actions"

interface Tag {
  id: number
  name: string
  color: string
}

interface User {
  id: number
  name: string
  avatarUrl: string | null
}

export function FilterBar({ onExport }: { onExport: () => void }) {
  const { filters, setFilters, isDarkMode, setIsDarkMode } = useKanban()
  const [tags, setTags] = useState<Tag[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const tagsData = await getAllTags()
        const usersData = await getAllUsers()
        setTags(tagsData)
        setUsers(usersData)
      } catch (error) {
        console.error("Error fetching filter data:", error)
      }
    }

    fetchFilterData()
  }, [])

  const handleAddColumn = async () => {
    if (newColumnTitle.trim() === "") return

    const result = await addColumn(newColumnTitle)
    if (result.success) {
      setNewColumnTitle("")
      setIsAddColumnDialogOpen(false)
      // We'll rely on revalidatePath to update the UI
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Filter by Tags</h4>
                <div className="space-y-2">
                  {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag.id}`}
                        checked={filters.tags.includes(tag.id)}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            tags: checked ? [...prev.tags, tag.id] : prev.tags.filter((id) => id !== tag.id),
                          }))
                        }}
                      />
                      <Label htmlFor={`tag-${tag.id}`} className="flex items-center text-sm font-normal">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tag.color }}></span>
                        {tag.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Filter by Assignee</h4>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={filters.users.includes(user.id)}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            users: checked ? [...prev.users, user.id] : prev.users.filter((id) => id !== user.id),
                          }))
                        }}
                      />
                      <Label htmlFor={`user-${user.id}`} className="text-sm font-normal">
                        {user.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Filter by Due Date</h4>
                <RadioGroup
                  value={filters.dueDate}
                  onValueChange={(value: "all" | "overdue" | "today" | "upcoming") => {
                    setFilters((prev) => ({
                      ...prev,
                      dueDate: value,
                    }))
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="due-all" />
                    <Label htmlFor="due-all" className="text-sm font-normal">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="overdue" id="due-overdue" />
                    <Label htmlFor="due-overdue" className="text-sm font-normal">
                      Overdue
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="today" id="due-today" />
                    <Label htmlFor="due-today" className="text-sm font-normal">
                      Today
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upcoming" id="due-upcoming" />
                    <Label htmlFor="due-upcoming" className="text-sm font-normal">
                      Upcoming
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters({
                    tags: [],
                    users: [],
                    dueDate: "all",
                  })
                }}
              >
                Clear Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog open={isAddColumnDialogOpen} onOpenChange={setIsAddColumnDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="column-title">Column Title</Label>
              <Input
                id="column-title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Enter column title..."
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddColumnDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddColumn}>Add Column</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>

        <Button variant="outline" size="sm" className="h-8" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  )
}
