import CustomText from "../elements/CustomText";
import ListItemWrapper from "../elements/ListItemWrapper";
import PersonListItem from "./TaskListItem";
import { getTaskColor, type Task } from "./tasks";
type TasksListProps = {
  tasks: Task[];
};
const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <ul className="list-unstyled p-0 w-100">
      {tasks.length > 0 ? (
        <>
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
        </>
      ) : (
        <CustomText className="mt-3" fontSize={16}>
          Jej! Nie masz żadnych zadań!
        </CustomText>
      )}
    </ul>
  );
};

export default TasksList;
