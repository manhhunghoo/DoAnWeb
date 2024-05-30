"use client";
import { Tooltip } from "@mui/material";
import { Plus } from "lucide-react";
export const NavAction = () => {
  return (
    <div>
      <Tooltip title="Add friend" placement="right" arrow>
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[48px] group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className="group-hover:text-white transition text-emerald-500"
              size={25} />
          </div>
        </button>
      </Tooltip>
    </div>
  )
}