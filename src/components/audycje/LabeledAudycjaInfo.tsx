import type React from "react";
import CustomText from "../elements/CustomText";
import type { Nil } from "../../common";

type LabeledAudycjaInfoProps = {
  label: string;
  value?: string | number | Nil;
};

const LabeledAudycjaInfo: React.FC<LabeledAudycjaInfoProps> = ({
  label,
  value,
}) => {
  return (
    <CustomText fontSize={12} headerType="span" lineHeight="1.2">
      {label}:&nbsp;
      <CustomText
        fontSize={12}
        headerType="span"
        fontWeight={600}
        lineHeight="1.2"
      >
        {value || "---"}
      </CustomText>
    </CustomText>
  );
};

export default LabeledAudycjaInfo;
