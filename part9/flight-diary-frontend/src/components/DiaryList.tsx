import { DiaryListProps } from '../types/types';

const DiaryList: React.FC<DiaryListProps> = ({ diaries }) => {
  return (
    <ul>
      {diaries.map((diary) => (
        <li key={diary.id}>
          <p><strong>Date:</strong> {diary.date}</p>
          <p><strong>Weather:</strong> {diary.weather}</p>
          <p><strong>Visibility:</strong> {diary.visibility}</p>
          {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
        </li>
      ))}
    </ul>
  );
};

export default DiaryList;
