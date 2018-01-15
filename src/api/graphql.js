import mutationState from 'react-apollo-mutation-state';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import withData from './withData';

export default (cmp, ...rest) => withData(
  mutationState()(
    compose(
      ...rest.map(
        ({query, ...options}) => graphql(gql`${query}`, options)
      )
    )(cmp)
  )
);
