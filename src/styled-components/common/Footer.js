import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from '@/styled-components/common/Link';

const FooterContainer = styled.footer`
  .footerWrapper {
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    > div {
      border-top: 1px solid ${props => props.theme.colors.red};
      padding-top: 2.6rem;
      ul {
        flex-basis: 100%;
        list-style-type:none;
        display: flex;
        flex-direction: row;
        margin: 0;
        padding: 0;
        padding-bottom: 2.6rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
          background: ${props => props.theme.colors.red};
          padding: .3rem 1rem;
          border-radius: 25px;
          box-shadow: 0 0 1px 1px ${props => props.theme.colors.pink};
          transition: .1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          a {
            text-decoration: none;
            text-transform: uppercase;
            display: block;
            font-size: 1.6rem;
            color: ${props => props.theme.colors.pink};
            h3 {
              font-size: 1.6rem;
            }
          }
        }
      }
    }
  }
  .footerEnd {
    border-radius: 50%;
    overflow:hidden;
    transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 -10px 10rem 6rem rgba(189, 41, 41, .7);
  }
  @media (hover: hover) {
    li:hover {
      transform: scale(.9);
    }
  }
  @media (min-width: 920px) {
    li {
      box-shadow: 0 0 1px 1px transparent;
    }
    .footerEnd {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

const Footer = ({label, nextFolder}) => {
  const [adminRoutes, setAdminRoutes] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    let admin = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME);
    if (admin) {
      setAdminRoutes(true);
    }
    if (footer) {
      document.getElementsByClassName('footerEnd')[0].style.boxShadow='0 -10px 10rem 6rem rgba(189, 41, 41, .7)';
      let buttons = document.getElementById('footer').getElementsByTagName('li');
      for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.style.boxShadow='0 0 1px 1px #f2d5d5';
      }
    } else {
      document.getElementsByClassName('footerEnd')[0].style.boxShadow='';
      let buttons = document.getElementById('footer').getElementsByTagName('li');
      for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.removeAttribute('style');
      }
    }
    const onScroll = () => {
      setFooter((window.innerHeight + window.scrollY) >= document.body.offsetHeight);
    }; 
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [footer]);

  return (
    <FooterContainer>
      <div id='footer' className='footerWrapper'>
        <div>
          <ul>
            <li className='first'>
              <Link href={`/${label}`} className='link'>
                <h3>Volver</h3>
              </Link>
            </li>
            {nextFolder ? 
              <li className='last'>
                <Link href={adminRoutes ? `/panel/${label}?folder=${nextFolder.route_title}` : `/${label}/${nextFolder.route_title}`} className='link'>
                  <h3>Siguiente</h3>  
                </Link>
              </li>
            : null}
          </ul>
        </div>
      </div>
      <div className='footerEnd'></div>
    </FooterContainer>
  );
}

export default Footer;