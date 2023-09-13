import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "noteSlice",
  initialState: {
    noteList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setNoteList: (state, action) => {
      state.noteList = action.payload;
    },
    addNote: (state, action) => {
      state.noteList.push(action.payload);
    },
    removeNote: (state, action) => {
      state.noteList = state.noteList.filter(
        (note) => note.id !== action.payload
      );
    },
    updateNote: (state, action) => {
      const noteIndex = state.noteList.findIndex((note) => note.id === action.payload.id);
      state.noteList[noteIndex] = action.payload;
    },
  },
});

export const noteReducer = notesSlice.reducer;
export const { setNoteList, addNote, removeNote, updateNote } =
  notesSlice.actions;
