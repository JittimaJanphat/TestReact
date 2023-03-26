import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// @mui
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';

import { dataMovieAll } from '../features/counter/counterSlice';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';



// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [dataMovie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const valMovieAll = useSelector((state) => state.counter.moviesAll)
  

const dispatch = useDispatch()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    // declare the data fetching function
    const myArray =[];
    const fetchData = async () => {
      const {data} = await axios.get('https://www.majorcineplex.com/apis/get_movie_avaiable');
      setMovie(data.movies);
      setIsLoading(true);
      // console.log({dataMovie});
      localStorage.setItem('dataMovies',JSON.stringify(data.movies));

      // data.movies.map((DataMovies) => ( 
      //   // console.log(DataMovies);
      //   DataMovies.check = false
      // ));
      let i = 0 ;
      while (i < data.movies.length){
        data.movies[i].check = false
        i+=1;;
    }

      dispatch(dataMovieAll(data.movies));
      // const savedMovie = localStorage.getItem(dataMovies);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <>
      <Helmet>
        <title> Cinema: Movie Finder </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Movie Finder
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {isLoading && <ProductList products={valMovieAll} />}
        <ProductCartWidget />
      </Container>
    </>
  );
}
