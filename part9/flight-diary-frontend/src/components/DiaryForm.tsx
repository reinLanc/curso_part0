import React from 'react';
import { DiaryFormProps } from '../types/types';
import { visibilityOptions, weatherOptions } from '../constants';

const DiaryForm: React.FC<DiaryFormProps> = ({ newDiary, setNewDiary, handleAddDiary }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewDiary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddDiary(newDiary);
    setNewDiary({
      date: '',
      weather: 'sunny',
      visibility: 'great',
      comment: '',
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newDiary.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Weather:</label>
        {weatherOptions.map((option) => (
          <label key={option}>
            <input 
              type="radio"
              name="weather"
              value={option}
              checked={newDiary.weather === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </div>
      <div>
        <label>Visibility:</label>
        {visibilityOptions.map((option) => (
          <label key={option}>
            <input 
              type="radio"
              name="visibility"
              value={option}
              checked={newDiary.visibility === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </div>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          name="comment"
          value={newDiary.comment}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default DiaryForm;
