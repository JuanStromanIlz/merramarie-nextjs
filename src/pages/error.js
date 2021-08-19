import Link from '@/styled-components/common/Link';
import styled from 'styled-components';

const Error = styled.div`
  padding: 2.6rem;
  width: 100%;
  height: 100%;
  span {
    margin-bottom: 1.6rem;
  }
  span:hover {
    text-decoration: underline;
  }
`;

const ErrorView = () => {

  return (
    <Error>
      <span>Ocurrio un error</span>
      <Link href='/' className='link'>Volver al home</Link>
    </Error>
  );

};

export default ErrorView;