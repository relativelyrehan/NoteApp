import {useDispatch} from 'react-redux';
import {setNotes} from '../redux/actions/users';
import axios from 'axios';

export const getAllPosts = async () => {
  const dispatch = useDispatch();
  console.log('I am calld');
  const response = await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .catch(err => console.log(err));

  dispatch(setNotes(response.data));
};
