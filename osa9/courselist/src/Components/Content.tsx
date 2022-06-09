import { courseProps } from '../types';
import Part from './Part';

const Content = ( { courseParts }: courseProps)=> {
  return (
    <div>
    {courseParts.map( e => (
        <Part key = {e.name} part = {e} />
    ))  
    }
    </div>
    
  );
};
export default Content