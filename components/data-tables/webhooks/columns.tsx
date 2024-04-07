"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WebhookData } from "@/lib/paymongo";
import CellAction from "./cell-action";
import { Badge } from "@/components/ui/badge";

interface WebhookData1 {
  id: string;
  type: string;
  attributes: {
    type: string;
    livemode: boolean;
    data?: string;
    secret_key: string;
    status?: string;
    url?: string;
    events?: string[];
    previous_data: any;
    created_at: number;
    updated_at: number;
  };
}

export const columns: ColumnDef<WebhookData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "attributes.url",
    header: "URL",
  },
  {
    accessorKey: "attributes.status",
    header: "Status",
    cell: ({ row }) =>
      row.original.attributes.status == "enabled" ? (
        <Badge variant="default">Enabled</Badge>
      ) : (
        <Badge variant="destructive">Disabled</Badge>
      ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.attributes.created_at * 1000);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date);
      return <>{formattedDate}</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
