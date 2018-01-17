import { compose, prop } from 'ramda';

export default f => compose(f, prop(`value`));
