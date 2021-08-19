import styled from 'styled-components';
import Link from '@/styled-components/common/Link';
import { useState, useContext } from 'react';
import { AdminCont } from '@/context/AdminContext';

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1;
  transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  .navWrapper {
    position: relative;
    padding: 1rem 2.6rem;
    display: flex;
    flex-direction: row;
    h1 {
      text-transform: uppercase;
      -webkit-text-stroke: 2px ${props => props.theme.colors.pink};
      color: transparent;
    }
    .list {
      display: flex;
      align-items: center;
      margin-right: auto;
      flex-basis: 100%;
      ul {
        display: flex;
        flex-basis: 100%;
        flex-direction: row;
        justify-content: space-between;
        list-style-type:none;
        padding-left: 0;
        margin: 0;
        margin-right: 10%;
        li {
          display: none;
          justify-content: center;
          align-items: center;
          padding: auto 0;
          a {
            color: ${props => props.theme.colors.pink};
            text-decoration: none;
            text-transform: uppercase;
          }
        }
        li:first-child {
          display: flex;
          padding: .1rem 0;
        }
        li:last-child {
          margin-right: 0;
        }
      }
    }
    .hamburgerMenu {
      margin: auto 0 auto auto;
      button {
        background: transparent;
        border: none;
        color: white;
        display: flex;
        position: relative;
        > span {
          position: absolute;
          left: 50%;
          margin-left: -17.5px;
          top: 50%;
          margin-top: -17.5px;
          font-size: 35px;
          display: block;
          color: ${props => props.theme.colors.red};
          transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      }
    }
    .hamburger {
      .hamburger__slice {
        position: fixed;
        height: calc(100% - 55px);
        top: 55px;
        left: 0px;
        right: 0px;
        width: 100vw;
        overflow: auto;
        display: none;
        justify-content: flex-end;
        padding-top: 2.6rem;
        padding-right: 2.6rem;
        ul {
          list-style-type:none;
          padding-left: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          li {
            align-self: flex-end;
            a {
              color: ${props => props.theme.colors.pink};
              text-decoration: none;
              text-transform: uppercase;
              display: block;
              font-size: 20px;
              margin-bottom: 1.6rem;
            }
          }
        }
      }
    }
    .navOption {
      font-size: 2rem;
      font-weight: 400;
    }
    .homeTag {
      font-size: 2.2rem !important;
      font-weight: 700 !important;
      color: ${props => props.theme.colors.red} !important;
    }
    .new { 
      a {
        color: ${props => props.theme.colors.green} !important;
      }
    }
  }
  /* HAMBURGER ANIMATIONS */
  .menuIsOpen {
    display: flex !important;
    background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 36%);
  }
  .iconRotate__open {
    transform: rotate(90deg);
  }
  .menuSlice__open {
    animation: menuOpen .1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    @keyframes menuOpen {
      0% { 
        opacity: 0; 
      }
      100% { 
        opacity: 1; 
      }
    }
  }
  .menuSlice__close {
    animation: menuClose .1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    @keyframes menuClose {
      0% { 
        opacity: 1; 
      }
      100% { 
        opacity: 0; 
      }
    }
  }
  @media (hover: hover) {
    a:hover {
      color: ${props => props.theme.colors.red} !important;
    }
    .log:hover a, .new:hover a {
      color: ${props => props.theme.colors.pink} !important;
    }
  }
  @media (min-width: 920px) {
    position: inherit;
    .navWrapper {
      background-color: transparent !important;
    }
    .list ul li {
      display: flex !important;
    }
    .list ul li:first-child {
      padding: .6rem 0 !important;
    }
    .hamburger {
      display: none !important;
    }
    .hamburgerMenu {
      display: none !important;
    }
    .navOption {
      font-size: 1.4rem !important;
      line-height: 1.4rem;
    }
  }
`;

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const {token} = useContext(AdminCont);
  function openMenu() {
    if (!menu) {
      // Remove the title in the page
      document.getElementsByClassName('header__floatTitle')[0].style.transform='translateX(-200%)';
      // Make the cards no click
      let cards = document.getElementsByClassName('card__item');
      if (cards) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.add('noClick');
        }
      }
      // Check for folder videos
      let folder = document.getElementsByClassName('folder__item')[0];
      if (folder) {
        let folderVideo = folder.getElementsByTagName('iframe')[0];
        if (folderVideo) {    
          folderVideo.classList.add('noClick'); 
        }
      }
      // Animations for open the menu
      document.getElementsByClassName('navWrapper')[0].style.background='linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 36%)';
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuSlice__open');
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuIsOpen');
      document.getElementById('menuIcon').classList.add('iconRotate__open');
      setTimeout(() => {
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__open');
      }, 100);
      setMenu(true);
    } else {
      // Put back the page title
      document.getElementsByClassName('header__floatTitle')[0].style.transform='';
      // Remove z-index from iframe 

      // Remove the cards no click
      let cards = document.getElementsByClassName('card__item');
      if (cards) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove('noClick');
        }
      }
      // Check for folder videos
      let folder = document.getElementsByClassName('folder__item')[0];
      if (folder) {
        let folderVideo = folder.getElementsByTagName('iframe')[0];
        if (folderVideo) {    
          folderVideo.classList.remove('noClick'); 
        }
      }
        // Animations for close the menu
        document.getElementsByClassName('navWrapper')[0].removeAttribute('style');;
      document.getElementsByClassName('hamburger__slice')[0].classList.add('menuSlice__close');
      document.getElementById('menuIcon').classList.remove('iconRotate__open');
      setTimeout(() => {
        document.getElementsByClassName('header__floatTitle')[0].classList.remove('titleSlice__open');
        document.getElementsByClassName('header__floatTitle')[0].classList.remove('titleSlice__close');
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuSlice__close');
        document.getElementsByClassName('hamburger__slice')[0].classList.remove('menuIsOpen');
      }, 100);
      setMenu(false);
    }
  }

  return (
    <Navbar>
      <div className='navWrapper'>
        <div className='list'>
          <ul>
            <li><Link className='navOption link homeTag' href='/'>merra marie</Link></li>
            <li><Link className='navOption link' href='/editorial'>editorial</Link></li>
            <li><Link className='navOption link' href='/artwork'>artwork</Link></li>
            <li><Link className='navOption link' href='/commercial'>comercial</Link></li>
            <li><Link className='navOption link' href='/films'>films</Link></li>
            <li><Link className='navOption link' href='/blog'>blog</Link></li>
            <li><Link className='navOption link' href='/publications'>publicaciones</Link></li>
            <li><Link className='navOption link' href='/about_me'>sobre mi</Link></li>
            <li><Link className='navOption link' href='/contact'>contacto</Link></li>
            {token && <li className='new'><Link className='navOption link' href='/panel/new'>nuevo</Link></li>}
            {token && <li><Link className='navOption link' href='/panel/log_out'>log out</Link></li>}
          </ul>
        </div>
        <div className='hamburgerMenu'>
          <button onClick={() => openMenu()}>
            <span id='menuIcon' className='material-icons navOption'>arrow_drop_down</span>
          </button>
        </div>
        <div className='hamburger'>
          <div className='hamburger__slice'>
            <div>
              <ul>
                <li><Link href='/editorial' className='link'>editorial</Link></li>
                <li><Link href='/artwork' className='link'>artwork</Link></li>
                <li><Link href='/commercial' className='link'>comercial</Link></li>
                <li><Link href='/films' className='link'>films</Link></li>
                <li><Link href='/blog' className='link'>blog</Link></li>
                <li><Link href='/publications' className='link'>publicaciones</Link></li>
                <li><Link href='/about_me' className='link'>sobre mi</Link></li>
                <li><Link href='/contact' className='link'>contacto</Link></li>
                {token && <li className='new'><Link className='navOption link' href='/panel/new'>nuevo</Link></li>}
                {token && <li><Link className='navOption link' href='/panel/log_out'>log out</Link></li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Nav;