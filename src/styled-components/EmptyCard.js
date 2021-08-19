import styled from 'styled-components';
import Link from '@/styled-components/common/Link';

const Empty = styled.div`
  width: 100%;
  height: 100%;
  span {
    margin-bottom: 1.6rem;
  }
`;

const EmptyCard = () => (
  <Empty>
    <span>Ups! esta sección esta vacia.</span>
    <Link href='/' className='link'>Volver al home</Link>
  </Empty>
);

export default EmptyCard;