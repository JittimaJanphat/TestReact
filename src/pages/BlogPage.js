import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Card, Link, Typography, Stack,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function BlogPage({...other}) {

  const savedMovie = JSON.parse(localStorage.getItem('dataMovies'));
  // console.log(savedMovie);
  const [dataFev, setDataFev] = useState(JSON.parse(localStorage.getItem('codeFev')));
  

  const dispatch = useDispatch()
  const AllFev = useSelector((state) => state.counter.moviesAll)
  // localStorage.getItem(dataMovies.dataMovie)
  
  return (
   <Grid container spacing={3} {...other}>
    {AllFev.map((product) => (
      (product.check === true) &&
      
      (<Grid key={product.id} item xs={12} sm={6} md={3}>
    <Card sx={{ height: 430 }}>
    <Box sx={{ pt: '100%', position: 'relative' }}>
      <StyledProductImg alt={product.title_en} src={product.poster_url} />
    </Box>


    <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="subtitle2" noWrap>
          {product.title_en}
        </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* <ColorPreview colors={'info'} /> */}
        <Typography variant="subtitle1">
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: 'text.disabled',
            }}
          >
            {product.title_th && product.title_th}
          </Typography>
          <br />
          {product.director}
        </Typography>
      </Stack>

      
    </Stack>
  </Card>
  </Grid>)
    ))}
    </Grid>
  );
}
