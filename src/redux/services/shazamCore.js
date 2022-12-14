import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const shazamCoreApi= createApi({
    reducerPath: 'shazamCoreApi', 
    baseQuery: fetchBaseQuery({
    baseUrl:'https://shazam-core.p.rapidapi.com/',
    prepareHeaders:(headers)=>{
        headers.set('X-RapidAPI-Key','1664850bc8msh09875e1fb1c0b40p1e8d90jsn78b5edd175ce')
        return headers;
    },
   }),
   endpoints:(builder)=>({
    getTopCharts:builder.query({query:()=>'/v1/charts/world'}),
    getSongsByGenre:builder.query({query:(genre)=>`/v1/charts/genre-world?genre_code=${genre}`}),
    getSongDetails:builder.query({query:({songid})=>`/v1/tracks/details?track_id=${songid}`}),
    getSongRelated: builder.query({ query: ({ songid }) => `/v1/tracks/related?track_id=${songid}` }),
    getArtistDetails: builder.query({ query: ( artistId ) => `/v2/artists/details?artist_id=${artistId}` }),
    getAlbumDetails: builder.query({ query: ( songid ) => `/v1/catalog/us/albums/${songid}` }),
    getSongsByCountry: builder.query({ query: ( countryCode ) => `/v1/charts/country?country_code=US` }),
    getSongsBySearch: builder.query({ query: ( search ) => `/v1/search/multi?search_type=SONGS_ARTISTS&query=${search}` }),
    

   }),
});


export const{
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetAlbumDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery,
}= shazamCoreApi;