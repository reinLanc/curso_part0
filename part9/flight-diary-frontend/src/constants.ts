import { NewDiary } from "./types/types";

export const apiBaseUrl = 'http://localhost:3000/api/diaries';
export const weatherOptions: NewDiary['weather'][] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
export const visibilityOptions: NewDiary['visibility'][] = ['great', 'good', 'ok', 'poor'];
