import {printApolloError} from '../src/components/Alert';
import graphql from '../src/api/graphql';
import {Router} from '../src/routes';

const Login = ({onSubmit, loading, error}) =>
  <form onSubmit={onSubmit}>
    {printApolloError(error)}
    <label>
      Login
      <input autoFocus required type="email" placeholder="Enter your Email" name="email" />
    </label>
    <label>
      Password
      <input required type="password" placeholder="Enter your password" name="password" />
    </label>
    <button disabled={loading} type="submit" className="flex-center-self">{loading ? 'Working...' : 'Login'}</button>
  </form>;

export default graphql(Login, {
  query: `
    mutation($email: String!, $password: String!) {
      signinUser(email: $email, password: $password) {
        _id
      }
    }
  `,
  props: ({mutate, ownProps: {mutation: {set, loading, error}}}) => ({

    loading,

    error,

    onSubmit(e) {
      e.preventDefault();

      const {email: {value: email}, password: {value: password}} = e.target;

      set({loading: true});
      mutate({
        variables: {email, password},
        update: () => {
          set({loading: false});
          Router.replaceRoute('home');
        }
      }).catch(error => {
        set({loading: false, error});
      });
    }

  })
});
