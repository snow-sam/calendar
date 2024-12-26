"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/lib/query"

import { setDefaultOptions } from "date-fns";
import { enUS } from 'date-fns/locale'

import { useDateNav } from "@/hooks/useDateNav";
import { Button } from "@/components/ui/button";
import { Schedule } from "@/components/Schedule";

import { ChevronLeft, ChevronRight } from "lucide-react"

import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { date, setDate, handlePreviousWeek, handleNextWeek } = useDateNav()
  setDefaultOptions({ locale: enUS })

  return (
    <main className="selection:text-neutral-100 selection:bg-neutral-800">
      <div className="absolute right-4 top-4 flex gap-4">
        <Button className="size-8" onClick={handlePreviousWeek} variant="outline" size="icon">
          <ChevronLeft />
        </Button>
        <Button className="size-8" onClick={handleNextWeek} variant="outline" size="icon">
          <ChevronRight />
        </Button>
        <UserButton/>
      </div>
      <QueryClientProvider client={queryClient}>
        <Schedule date={date} changeDay={setDate} />
      </QueryClientProvider>
    </main>
  );
}