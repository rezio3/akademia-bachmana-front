import "./ListItemWrapper.scss";

type ListItemWrapperProps = {
  children: React.ReactNode;
};
const ListItemWrapper: React.FC<ListItemWrapperProps> = ({ children }) => {
  return <li className="list-item-container">{children}</li>;
};

export default ListItemWrapper;
