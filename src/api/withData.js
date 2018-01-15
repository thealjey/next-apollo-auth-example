import {withData} from 'next-apollo';
import {HttpLink} from 'apollo-link-http';
import {port} from '../constants';

export default withData(headers => ({
  link: new HttpLink({
    uri: `http://localhost:${port}/graphql`,
    credentials: 'same-origin',
    headers
  })
}));
