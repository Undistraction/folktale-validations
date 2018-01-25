import { compose } from 'ramda';
import { propValue } from '../utils';

export default f => compose(f, propValue);
