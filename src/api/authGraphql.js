import graphql from './graphql';
import {Router} from '../routes';

export default (cmp, ...rest) =>
  graphql(cmp, {
    query: `
      {
        authenticated
      }
    `,
    props({data: {loading, authenticated}, ownProps: {ctx}}) {
      if (!loading && !authenticated) {
        if (ctx) {
          ctx.res.redirect('/login');
        } else {
          Router.replaceRoute('/login');
        }
      }

      return {};
    }
  }, ...rest);
