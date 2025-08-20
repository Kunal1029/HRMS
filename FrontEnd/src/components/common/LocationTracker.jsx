import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPath } from '../../redux/slices/helperSlice';

function LocationTracker() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPath(location.pathname));
  }, [location.pathname, dispatch]);

  return null;
}

export default LocationTracker;
