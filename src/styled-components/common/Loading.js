import styled from 'styled-components';
import Image from 'next/image';

const LoadingIcon = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  img {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 20vw;
    animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  @keyframes lds-heart {
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
  }
`;
const Loading = () => {
  return (
    <LoadingIcon>
      <img src='/heart.svg' alt='LoadingIcon'></img>
    </LoadingIcon>
  );
}
export default Loading;