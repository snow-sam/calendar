"use client"

import * as React from "react"

import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Plus } from "lucide-react";

type DrawerDialogProps = {
  children: React.ReactNode
}

export function DrawerDialog({ children }: DrawerDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4" variant="outline" size="icon"><Plus /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="hidden">
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>
              Create here your new task and go for it.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} repositionInputs={false}>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-16 right-8 size-10" variant="outline" size="icon"><Plus /></Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit">
        <DrawerHeader className="text-left hidden">
          <DrawerTitle>New Task</DrawerTitle>
          <DrawerDescription>
            Create here your new task and go for it.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 h-fit">
          {children}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
