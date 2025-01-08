import { Content as ContentProps} from "../interfaces/content";

const Content = ({parts}:ContentProps) => {
  return (
    <div>
        {parts.map((part, index) => (
            <p key={index}>
                {part.name} - {part.exerciseCount}
            </p>
        ))}
    </div>
  );
};

export default Content;