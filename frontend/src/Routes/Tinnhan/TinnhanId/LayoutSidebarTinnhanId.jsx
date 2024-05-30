import { current } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { TinnhanSidebar } from "../../../components/Tinnhan/TinnhanSidebar";

const LayoutSidebarTinnhanId = ({ children }) => {

  //   const profile = await currentProfile();

  //   if (!profile) {
  //     return redirectToSignIn()
  //   }

  //   const server = await db.server.findUnique({
  //     where: {
  //       id: PanoramaSharp.serverId,
  //       members: {
  //         some: {
  //           profileId: profile.id
  //         }
  //       }
  //     }
  //   })
  // if (!server) {
  //   return redirect("/")
  // }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0"></div>
      <TinnhanSidebar />
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  );
}

export default LayoutSidebarTinnhanId;