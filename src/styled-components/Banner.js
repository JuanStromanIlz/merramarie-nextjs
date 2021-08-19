import styled from 'styled-components';
import Link from '@/styled-components/common/Link';
import { useEffect } from 'react';

const BannerContainer = styled.div`
  #cortina {
    position: absolute;
    background: black;
    inset: 0;
    transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    overflow: hidden;
    h1 {
      margin: auto;
      align-self: center;
      text-align: center;
      font-size: 10rem;
      font-weight: 400;
      line-height: 10rem;
      -webkit-text-stroke: 2px ${props => props.theme.colors.red};
      color: transparent;
    }
    #textContainer {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding: 2.6rem;
      #heart {
        cursor: none !important;
        display: inline-block;
        position: absolute;
        width: 80px;
        height: 80px;
      }
    }
    #imgContainer {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: row;
      justify-content: center;
      img {
        transition: 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  #homeMenu { 
    padding: 0 2.6rem;
    ul {
      min-height: 100vh;
      list-style-type:none;
      padding-left: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      li {
        font-size: 3.6rem;
        font-weight: 400;
        line-height: 3.6rem;
        a {
          -webkit-text-stroke: 2px ${props => props.theme.colors.red};
          color: transparent;
        }
      }
    }
  }
  @media (hover: hover) {
    #homeMenu ul li:hover a {
      color: ${props => props.theme.colors.red};
      -webkit-text-stroke: inherit;
    }
  }
  @media (min-width: 920px) {
    h1 {
      font-size: 13rem !important;
      line-height: 13rem !important;
    }
    #textContainer {
      #lds-heart {
        position: absolute;
      }
    }
    #homeMenu {
      ul li {
        font-size: 5rem;
        line-height: 5rem;
      }
    }
  }
`;

const Banner = ({img}) => {
  function openHome() {
    document.getElementById('cortina').style.cssText='transform: translateX(-100%); opacity: 0;';
  }
  function onMouseMove(e) {
    document.getElementById('heart').style.cursor='pointer';
    document.getElementById('heart').style.transform='translate(-50%,-50%)';
    document.getElementById('heart').style.left = e.pageX + 'px';
    document.getElementById('heart').style.top = e.pageY + 'px';
  }
  useEffect(()=> {
    document.getElementById('cortina').focus();
  }, []);

  return (
    <BannerContainer>
      <div id='cortina' onClick={openHome}>
        {img === null ?
          <h1>Merra Marie</h1>
        : 
          <div id='imgContainer'>
            <img src={img} alt='home'></img>
            <img src={img} alt='home'></img>
            <img src={img} alt='home'></img>
          </div>
        }
        <div id='textContainer'
          onMouseMove={onMouseMove}
        >
          <img id='heart' src='/heart.svg' alt='click'></img>
        </div>
      </div>
      <div id='homeMenu'>
        <ul>
          <li><Link href='/editorial' className='link'>editorial</Link></li>
          <li><Link href='/artwork' className='link'>artwork</Link></li>
          <li><Link href='/commercial' className='link'>comercial</Link></li>
          <li><Link href='/films' className='link'>films</Link></li>
          <li><Link href='/blog' className='link'>blog</Link></li>
          <li><Link href='/publications' className='link'>publicaciones</Link></li>
          <li><Link href='/about_me' className='link'>sobre mi</Link></li>
          <li><Link href='/contact' className='link'>contacto</Link></li>
        </ul>
      </div>
    </BannerContainer>
  )
};

export default Banner;