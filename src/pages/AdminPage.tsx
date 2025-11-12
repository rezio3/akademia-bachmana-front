import SideMenu from "../components/SideMenu";
import SectionWrapper from "../components/elements/SectionWrapper";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <SideMenu />
      <div style={{ flex: 1, overflowY: "auto", height: "100vh" }}>
        <SectionWrapper>
          <Outlet />
        </SectionWrapper>
      </div>
    </>
  );
};

export default AdminPage;
