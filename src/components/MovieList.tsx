import axios from "axios";
import "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../index";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = await getDocs(collection(db, "apikey")).then(
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            apikey: doc.data().apikey,
          }));
          return data[0].apikey;
        }
      );
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const filteredResults = movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm, movies]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <RootContainer>
    <Container>
      <InputWrapper>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a movie"
        />
      </InputWrapper>
      <br />
      <br />
      <Wrapper>
        {searchTerm === ""
          ? movies.map((movie: any) => (
              <div key={movie.id} style={{ width: "300px" }}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            ))
          : searchResults.map((movie: any) => (
              <div key={movie.id} style={{ width: "300px" }}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            ))}
      </Wrapper>
    </Container>
    </RootContainer>
  );
};

export default MovieList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px;
`;

const Container = styled.div`
  margin: 50px;
  display: contents;
`;

const Input = styled.input`
  height: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RootContainer = styled.div`
  margin-top: 50px
`