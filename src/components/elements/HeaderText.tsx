type HeaderTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type HeaderTextProps = {
  children: React.ReactNode;
  headerType?: HeaderTag;
  fontWeight?: FontWeight;
  fontSize?: string | number;
  letterSpacing?: string | number;
  className?: string;
};

const HeaderText: React.FC<HeaderTextProps> = ({
  children,
  headerType = "h3",
  fontWeight = 400,
  fontSize = 24,
  letterSpacing = 0,
  className = "",
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
      }}
    >
      {children}
    </Tag>
  );
};

export default HeaderText;
