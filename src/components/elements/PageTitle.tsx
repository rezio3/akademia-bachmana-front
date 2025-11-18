import CustomText from "./CustomText";

const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomText headerType="h3" fontSize={30} fontWeight={300} className="my-4">
      {children}
    </CustomText>
  );
};

export default PageTitle;
