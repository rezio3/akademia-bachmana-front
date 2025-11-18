type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type CustomTextProps = {
  children: React.ReactNode;
  headerType?: Tag;
  fontWeight?: FontWeight;
  fontSize?: string | number;
  letterSpacing?: string | number;
  className?: string;
  lineHeight?: string;
  onClick?: () => void;
};

const CustomText: React.FC<CustomTextProps> = ({
  children,
  headerType = "h3",
  fontWeight = 400,
  fontSize = 24,
  letterSpacing = 0,
  className = "",
  lineHeight = 1.5,
  onClick,
}) => {
  const Tag = headerType;
  return (
    <Tag
      className={`m-0 ${className}`}
      style={{
        fontSize,
        fontFamily: "Montserrat",
        fontWeight,
        letterSpacing,
        lineHeight: lineHeight,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

export default CustomText;
