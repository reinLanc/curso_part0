import { CoursePart } from '../interfaces/coursePart';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
  case 'basic':
    return (
      <div>
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
        </p>
        <p>{part.description}</p>
      </div>
    );
  case 'group':
    return (
      <div>
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
        </p>
        <p>Project exercises {part.groupProjectCount}</p>
      </div>
    );
  case 'background':
    return (
      <div>
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
        </p>
        <p>{part.description}</p>
        <p>
              Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      </div>
    );
  case 'special':
    return (
      <div>
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
        </p>
        <p>{part.description}</p>
        <p>Requirements: {part.requirements.join(', ')}</p>
      </div>
    );
  default:
    return <div>Unknown part type</div>;
  }
};  

export default Part;