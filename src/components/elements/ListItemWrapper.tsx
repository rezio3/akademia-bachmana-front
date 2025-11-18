import "./ListItemWrapper.scss";

type ListItemWrapperProps = {
  children: React.ReactNode;
  className?: string;
  style: any;
};
const ListItemWrapper: React.FC<ListItemWrapperProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <li className={`list-item-container ${className}`} style={{ ...style }}>
      {children}
    </li>
  );
};

export default ListItemWrapper;
