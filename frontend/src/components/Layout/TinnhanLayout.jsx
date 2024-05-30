import LayoutSidebarTinnhanId from "../../Routes/Tinnhan/TinnhanId/LayoutSidebarTinnhanId";
import { NavSidebarSmall } from "../Navigation/NavSidebarSmall";
// import Dangxuat from "../Sidebar/Dangxuat";
// import Diendan from "../Sidebar/Diendan";
// import Hocnhom from "../Sidebar/Hocnhom";
// import Hoctap from "../Sidebar/Hoctap";
// import Khoahoc from "../Sidebar/Khoahoc";
// import SideBarSmall from "../Sidebar/SideBarSmall";
// import Menu from "./Menu/Menu";
// import Menuitem from "./Menu/Menuitem";
// import { config } from "@fortawesome/fontawesome-svg-core";


const TinnhanLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="h-full ">
        <div className="hidden md:flex W-[72px] z-30 flex-col fixed inset-y-0">
          <NavSidebarSmall />
        </div>
        <LayoutSidebarTinnhanId />
      </div>
      <main className="md:pl-[72px] h-full">
        {children}

      </main>
    </div>


    // <SideBarSmall>
    //   <div className=" flex px-16 rounded-r-lg inset-y-20">
    //     <Menu>
    //       <Menuitem title={<Khoahoc />} to={config.Khoahoc} />
    //       <Menuitem title={<Hocnhom />} to={config.hocnhom} />
    //       <Menuitem title={<Hoctap />} to={config.hoctap} />
    //       <Menuitem title={<Diendan />} to={config.diendan} />
    //       <Menuitem title={<Dangxuat />} to={config.dangxuat} />

    //     </Menu>
    //   </div>
    // </SideBarSmall>
  );
}

export default TinnhanLayout;