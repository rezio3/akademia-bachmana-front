import HeaderText from "./HeaderText";

const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderText headerType="h3" fontSize={30} fontWeight={300} className="my-4">
      {children}
    </HeaderText>
  );
};

export default PageTitle;
