import {setUser} from '../redux/actions/users';
import {useDispatch} from 'react-redux';

export const handleUser = name => {
  const dispatch = useDispatch();
  dispatch(setUser(name));
};
