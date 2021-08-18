import styled from 'styled-components';

const Page = styled.div`
  padding: 2.6rem;
`;

const Wrapper = ({children}) => {
  return (
    <Page>
      {children}
    </Page>
  );
}

export default Wrapper;