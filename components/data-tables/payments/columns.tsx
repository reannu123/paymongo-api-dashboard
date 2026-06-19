"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { DemoPayment } from "@/lib/demo";
import { peso, shortDate } from "@/lib/format";

const statusClass: Record<DemoPayment["status"], string> = {
  paid: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  failed: "bg-red-500/15 text-red-600 border-red-500/30",
  refunded: "bg-amber-500/15 text-amber-600 border-amber-500/30",
};

export const paymentColumns: ColumnDef<DemoPayment>[] = [
  { accessorKey: "id", header: "Payment ID" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <Badge variant="outline" className="uppercase">
        {row.original.method.replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{peso(row.original.amount)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={statusClass[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => shortDate(row.original.created_at),
  },
];
