import { createContext, useContext } from "react";

const NoteSearchContext = createContext({
  searchQuery: "",
  debouncedSearchQuery: "",
  setSearchQuery: () => {},
});

export function NoteSearchProvider({ value, children }) {
  return (
    <NoteSearchContext.Provider value={value}>
      {children}
    </NoteSearchContext.Provider>
  );
}

export function useNoteSearch() {
  return useContext(NoteSearchContext);
}
