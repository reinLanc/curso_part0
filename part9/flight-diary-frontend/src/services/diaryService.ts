import axios from 'axios';
import { DiaryEntry } from '../types/types';
import { apiBaseUrl } from '../constants';

export const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(apiBaseUrl);
  return response.data;
};