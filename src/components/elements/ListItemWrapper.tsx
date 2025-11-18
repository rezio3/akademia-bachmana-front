import "./ListItemWrapper.scss";

type ListItemWrapperProps = {
  children: React.ReactNode;
  className?: string;
};
const ListItemWrapper: React.FC<ListItemWrapperProps> = ({
  children,
  className = "",
}) => {
  return <li className={`list-item-container ${className}`}>{children}</li>;
};

export default ListItemWrapper;
