import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Linkify from 'react-linkify';
import StickyTitle from '@/common/StickyTitle';
import ImageSlider from '@/styled-components/ImageSlider';

const FolderContainer = styled.div`
  article {
    min-height: calc(100vh - 140px);
    .content {
      > div {
        margin-bottom: 2rem;
      }
      .content__text {
        white-space: pre-line;
      }
      .content__images {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(600px, 1f));
        .image {
          cursor: pointer;
          overflow: hidden;
          padding-top: 1.3rem;
          padding-bottom: 1.3rem;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            backdrop-filter: invert(5%);
            transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
        }
        .bigImg {
          grid-column-start: 1;
          grid-column-end: 2;
          img {
            max-width: 900px;
            display: block;
            margin: 0 auto;
          }
        }
      }
      .content__video {
        .video {
          max-width: 900px;
          aspect-ratio: 16 / 9;
          position: relative;
          margin: auto;
          iframe {
            position: absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
          }
        }
      }
    }
  }
  .lazyload-wrapper {
    width: 100%;
    height: 100%;
    backdrop-filter: invert(5%);
  }
  @media (hover: hover) {
    .image:hover {
      img {
        transform: scale(1.1);
      }
    }
  a:hover {
    text-decoration: underline;
  }
  }
  @media (min-width: 480px) {
    .content__images {
      grid-template-columns: repeat(2, calc(100% / 2)) !important;
      .image {
        aspect-ratio: 1;
        padding-left: 1.3rem;
        padding-right: 1.3rem;
      }
    }
  }
  @media (min-width: 920px) {
    .content__images {
      grid-template-columns: repeat(auto-fit, calc(100% / 4)) !important;
    }
    .content__text {
      max-width: 60%;
    }
  }
`;

const Folder = ({folder}) => {
  const [pageBottom, setPageBottom] = useState(false);
  const [singleImg, setImage] = useState(0);
  const [slider, setSlider] = useState(false);
    
  function openSlider(index) {
    setImage(index);
    setSlider(true);
  }

  useEffect(() => { 
    if (document.body.offsetHeight <= window.innerHeight) {
      setPageBottom(true);
    }
    const onScroll = () => {
      if (!pageBottom) {
        setPageBottom((window.innerHeight + window.scrollY) >= (document.body.offsetHeight / 3) * 2);
      } if (pageBottom) {
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pageBottom]);

  return (
    <FolderContainer className='folder__item'>
      <article>
        <StickyTitle 
          isFolder={true} 
          share={pageBottom} 
          folder={{title: folder.title, label: folder.label, route: folder.route_title}}
        >
          {folder.title}
        </StickyTitle>
        <div className='content'>
          {folder.label === 'films' ? 
            <>
              {folder.videoLink ? 
                <div className='content__video'>
                  <div className='video'>
                    <iframe 
                      title={folder.title} 
                      src={folder.videoLink} 
                      frameBorder='0' 
                      allow='fullscreen; picture-in-picture' 
                    ></iframe>
                  </div>
                </div> 
              : null}
              {folder.images ? 
                <>
                  <div className='content__images'>
                    {folder.images.map((img, i) => 
                      <div key={i} className='image'>
                        <img onClick={() => openSlider(i)} width='100%' height='100%' src={img.url} alt={folder.title}></img>
                      </div>
                    )}
                  </div> 
                  <ImageSlider images={folder.images} singleImg={singleImg} open={slider} setOpen={setSlider} />
                </>
              : null}
            </>
          :
            <>
              {folder.images ? 
                <>
                  <div className='content__images'>
                    {folder.images.map((img, i) => 
                      <div key={i} className='image'>
                        <img onClick={() => openSlider(i)} width='100%' height='100%' src={img.url} alt={folder.title}></img>
                      </div>
                    )}
                  </div> 
                  <ImageSlider images={folder.images} singleImg={singleImg} open={slider} setOpen={setSlider} />
                </>
              : null}
              {folder.videoLink ? 
                <div className='content__video'>
                  <div className='video'>
                    <iframe 
                      title={folder.title} 
                      src={folder.videoLink} 
                      frameBorder='0' 
                      allow='fullscreen; picture-in-picture' 
                    ></iframe>
                  </div>
                </div> 
              : null}
            </>
          }  
          {folder.description ? 
            <div className='content__text'>
              <Linkify>
                <p>{folder.description}</p>
              </Linkify>
            </div>
          : null}
        </div>
      </article>
    </FolderContainer>
  );
};

export default Folder;