export interface DiaryEntry {
    id: number;
    date: string;
    weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
    visibility: 'great' | 'good' | 'ok' | 'poor';
    comment?: string;
}

export type NewDiary = {
    date: string;
    weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
    visibility: 'great' | 'good' | 'ok' | 'poor';
    comment?: string;
};

export type DiaryListProps = {
    diaries: DiaryEntry[]
}

export type DiaryFormProps = {
    newDiary: NewDiary;
    setNewDiary: React.Dispatch<React.SetStateAction<NewDiary>>;
    handleAddDiary: (diary: NewDiary) => void;
};