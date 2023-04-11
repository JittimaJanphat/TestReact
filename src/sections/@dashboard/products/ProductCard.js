import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import  FavoriteIcon  from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useState ,useEffect} from 'react';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';


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

export default function ShopProductCard({ product }) {
const [fev, setFev] = useState(false);
const [addFev, setAddFev] = useState([]);
const arr = [];

if (localStorage.getItem('codeFev') === null) {
  localStorage.setItem('codeFev', JSON.stringify(arr));
}

useEffect(() => {
  setAddFev(JSON.parse(localStorage.getItem('codeFev')));

}, [])

const handleClickFev =(id,isCheck)=> {
  let arrAddFev = [];
  setFev(!fev);
  arrAddFev = JSON.parse(localStorage.getItem('codeFev')).length !== 0
        ? (JSON.parse(localStorage.getItem('codeFev')))
        : [];

  if(isCheck===true){
    const index = arrAddFev.indexOf(id);
    arrAddFev.splice(index,1)
  } else {
    arrAddFev.push(id)
  }
  // arrAddFev.push(id)
  localStorage.setItem("codeFev", JSON.stringify(arrAddFev));
  setAddFev(JSON.parse(localStorage.getItem('codeFev')));

  // console.log(JSON.parse(localStorage.getItem('codeFev')));
}

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
                fontSize:12
              }}
            >
              {product.title_th && product.title_th}
            </Typography>
            <br />
            {product.director}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          {addFev.find(element => element === product.id) ? <FavoriteIcon onClick={()=>handleClickFev(product.id,true)} />: <FavoriteBorderIcon onClick={()=>handleClickFev(product.id,false)} /> }
        </Stack>
      </Stack>
    </Card>
  );
}
