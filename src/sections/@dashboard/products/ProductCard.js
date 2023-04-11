import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';


import  FavoriteIcon  from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useState } from 'react';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { addFevMovie,removeFevMovie } from '../../../features/counter/counterSlice';
// import { fCurrency } from '../../../utils/formatNumber';
// components
// import Label from '../../../components/label';
// import { ColorPreview } from '../../../components/color-utils';


// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product,index }) {
const [fev, setFev] = useState(false);
// const [addFev, setAddFev] = useState([]);
const arr = [];

// const count = useSelector((state) => state.counter.value)
// const countFevRe = useSelector((state) => state.counter.fevRe)

const dispatch = useDispatch()

  return (
    <Card sx={{ height: 430 }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={product.title_en} src={product.poster_url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {product.title_en}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={'info'} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                fontSize: 12
              }}
            >
              {product.title_th && product.title_th}
            </Typography>
            <br />
            {product.director}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          {product.check ? <FavoriteIcon onClick={()=>dispatch(removeFevMovie(index))} /> : <FavoriteBorderIcon onClick={()=>dispatch(addFevMovie(index))} />}
        </Stack>
      </Stack>
    </Card>
  );
}
