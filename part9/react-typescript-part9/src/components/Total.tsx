import { TotalProps } from '../interfaces/total';

const Total = ({total}: TotalProps) => {
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export default Total;
