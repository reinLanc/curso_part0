import { useEffect, useState } from 'react';
import { getDiaries, addDiary } from './services/diaryService';
import { DiaryEntry, NewDiary } from './types/types';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: '',
    weather: 'sunny',
    visibility: 'great',
    comment: '',
  });

  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await getDiaries();
      setDiaries(data);
    };
    fetchDiaries();
  }, []);

  const handleAddDiary = async (diary: NewDiary) => {
    try {
      const addedDiary = await addDiary(diary);
      setDiaries([...diaries, addedDiary]);
    } catch (error) {
      if(axios.isAxiosError(error) && error.response?.data) {
        alert(`Error: ${error.response.data}`);
      } else {
        alert('An unknown error occurred.');
      }
      console.error('Error adding diary', error);
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm
        newDiary={newDiary}
        setNewDiary={setNewDiary}
        handleAddDiary={handleAddDiary}
      />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;





