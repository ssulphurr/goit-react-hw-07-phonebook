import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';

const contactsInitialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },

    deleteContact(state, action) {
      const index = state.contacts.findIndex(
        conatct => conatct.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
  },
  extraReducers: {
    [fetchContacts.pending]() {
      console.log('PENDING');
    },
    [fetchContacts.fulfilled](state, action) {
      console.log('payload:', action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
