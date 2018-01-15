const Alert = ({children, type = 'danger'}) =>
  <div className={type}>
    {children}

    <style jsx>{`
      div {
        padding: .75rem 1.25rem;
        margin-bottom: 1rem;
        border-radius: .25rem;
        border-width: 1px;
        border-style: solid;
      }
      .primary {
        color: #004085;
        background-color: #cce5ff;
        border-color: #b8daff;
      }
      .secondary {
        color: #464a4e;
        background-color: #e7e8ea;
        border-color: #dddfe2;
      }
      .success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
      }
      .danger {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
      }
      .warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }
      .info {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
      }
      .light {
        color: #818182;
        background-color: #fefefe;
        border-color: #fdfdfe;
      }
      .dark {
        color: #1b1e21;
        background-color: #d6d8d9;
        border-color: #c6c8ca;
      }
    `}</style>
  </div>;

export function printApolloError(error) {
  const {graphQLErrors = [], networkError} = error || {};
  const errors = [...graphQLErrors];

  if (networkError) {
    errors.push(networkError);
  }

  return errors.map(({message}, i) => <Alert key={i}>{message}</Alert>);
}

export default Alert;
