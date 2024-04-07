"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Check,
  Copy,
  Edit,
  MoreHorizontal,
  Pause,
  Play,
  Trash,
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { WebhookData } from "@/lib/paymongo";
import usePaymongo from "@/hooks/use-paymongo";
interface CellActionProps {
  data: WebhookData;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const paymongo = usePaymongo();
  const onCopyUrl = () => {
    if (data.attributes.url === undefined) return;
    navigator.clipboard.writeText(data.attributes.url);
    toast.success("Copied Webhook URL to clipboard!");
  };

  const onCopyId = () => {
    if (data.id === undefined) return;
    navigator.clipboard.writeText(data.id);
    toast.success("Copied Webhook ID to clipboard!");
  };

  const onDisable = async (id: string) => {
    try {
      paymongo.sendDisableWebhook(id);
      toast.success("Webhook disabled!");
    } catch (error) {
      toast.error("Error occured while disabling webhook!");
    }
  };

  const onEnable = async (id: string) => {
    try {
      paymongo.sendEnableWebhook(id);
      toast.success("Webhook enabled!");
    } catch (error) {
      toast.error("Error occured while enabling webhook!");
    }
  };
  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopyUrl}>
            <Copy className="mr-2 h-4 w-4" />
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopyId}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEnable(data.id)}>
            <Play className="mr-2 h-4 w-4" />
            Enable
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDisable(data.id)}>
            <Pause className="mr-2 h-4 w-4" />
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
