import { createSlice } from '@reduxjs/toolkit';

interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
    gender: string;
    location: {
        name: string;
    };
    episode: string[];
}

interface CharactersState {
    allCharacters: Character[];
    characters: Character[];
    page: number;
    totalPages: number;
    hasMore: boolean;
    searchQuery: string;
    nameFilter: string;
    episodeCountFilter: number;
}

const initialState: CharactersState = {
    allCharacters: [],
    characters: [],
    page: 1,
    totalPages: 1,
    hasMore: true,
    searchQuery: '',
    nameFilter: '',
    episodeCountFilter: 0,
};

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setAllCharacters: (state, action) => {
            state.allCharacters = action.payload?.results || [];
        },
        setCharacters: (state, action) => {
            state.characters = action.payload?.results || [];
            state.totalPages = action.payload?.info?.pages || 1;
            state.hasMore = !!action.payload?.info?.next;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload.toLowerCase();
            state.characters = state.allCharacters.filter(character => {
                const query = state.searchQuery;
                return (
                    character.name.toLowerCase().includes(query) ||
                    character.species.toLowerCase().includes(query) ||
                    character.gender.toLowerCase().includes(query) ||
                    character.location.name.toLowerCase().includes(query) ||
                    character.episode.length.toString().includes(query)
                );
            });
        },
        setNameFilter: (state, action) => {
            state.nameFilter = action.payload.toLowerCase();
            state.characters = state.allCharacters.filter(character =>
                character.name.toLowerCase().includes(state.nameFilter)
            );
        },
        setEpisodeCountFilter: (state, action) => {
            state.episodeCountFilter = action.payload;
            state.characters = state.allCharacters.filter(character =>
                character.episode.length >= state.episodeCountFilter
            );
        },
        resetFilters: (state) => {
            state.searchQuery = '';
            state.nameFilter = '';
            state.episodeCountFilter = 0;
            state.allCharacters = state.allCharacters;
            state.characters = state.characters;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    }
});

export const { setAllCharacters, setCharacters, setSearchQuery, setNameFilter, setEpisodeCountFilter, resetFilters, setPage } = charactersSlice.actions;

export default charactersSlice.reducer;
