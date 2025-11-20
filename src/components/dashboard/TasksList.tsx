import ListItemWrapper from "../elements/ListItemWrapper";
import PersonListItem from "./TaskListItem";
import { getTaskColor, type Task } from "./tasks";
type TasksListProps = {
  tasks: Task[];
};
const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <ul className="list-unstyled p-0 w-100">
      {tasks.map((task, index) => (
        <ListItemWrapper
          style={{
            backgroundColor: getTaskColor(task.completed),
          }}
          key={task._id + index}
        >
          <PersonListItem task={task} />
        </ListItemWrapper>
      ))}
    </ul>
  );
};

export default TasksList;
