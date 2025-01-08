import { Content as ContentProps} from '../interfaces/content';
import Part from './Part';

const Content = ({parts}:ContentProps) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;