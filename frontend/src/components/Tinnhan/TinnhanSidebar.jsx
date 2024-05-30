import { TinnhanHeader } from "./TinnhanHeader"

export const TinnhanSidebar = () => {
  return (
    <div className="flex flex-col h-[500px] inset-y-0 dark:bg-[#2B2D31] text-primary w-full bg-slate-400">
      <TinnhanHeader />
    </div>
  )
}