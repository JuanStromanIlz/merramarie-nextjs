import styled from 'styled-components';
import Link from '@/styled-components/common/Link';
import StickyTitle from '@/styled-components/common/StickyTitle';
import EmptyCard from '@/styled-components/EmptyCard';
import Image from 'next/image';

const Card = styled.div`
  cursor: pointer;
  overflow: hidden;
  display: inline-block;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  aspect-ratio: 7 / 4;
  backdrop-filter: invert(5%);
  .mediaContainer {
    aspect-ratio: 7 / 4;
    position: relative;
    overflow: hidden;
    .labelImg, iframe {
      filter: brightness(.62);
    }
    .labelImg {
      filter: brightness(.62);
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    iframe {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      pointer-events: none;
    }
  }
  .cardInfo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.3rem;
    padding-top: .3rem;
    transition: .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 -1rem 15px 5px rgba(189, 41, 41, .7);
    background: rgba(189, 41, 41, .7);
    .title {
      color: ${props => props.theme.colors.pink};
      font-weight: 300;
      font-size: 1.8rem;
    }
    .tags {
      font-size: 1.4rem;
      text-transform: lowercase;
      font-weight: 200;
      font-style: italic;
      color: ${props => props.theme.colors.pink};
    }
  }
  .lazyload-wrapper {
    width: 100%;
    height: 100%;
    backdrop-filter: invert(5%);
  }
  @media (hover: hover) {
    :hover {
      .labelImg, iframe {
        filter: brightness(1);
      }
      .labelImg {
        transform: scale(1.1);
      }
      .cardInfo {
        opacity: 0;
      }
    }
  }
  @media (min-width: 480px) {
    :nth-child(odd) {
      margin-right: 1.3rem;
    }
    :nth-child(even) {
      margin-left: 1.3rem;
    }
  }
  @media (min-width: 920px) {
    .cardInfo {
      .title {
        font-size: 2.8rem;
      }
      .tags {
        font-size: 2.2rem; 
      }
    }
  }
`;

const LabelCard = ({item, adminRoutes}) => {
  return (
    <Link href={adminRoutes ? `/panel/${item.label}?folder=${item.route_title}` : `/${item.label}/${item.route_title}`} className='link'>
      <Card className='card__item'>
        {item.label === 'films' ? 
          item.videoLink ? 
            <div className='mediaContainer'>
              <iframe 
                title={item.title} 
                src={item.videoLink} 
                frameBorder="0" 
                allow="fullscreen; picture-in-picture" 
                allowFullScreen 
              ></iframe>
            </div>
          : item.images ? 
            <div className='mediaContainer'>
              <Image className='labelImg' placeholder='blur' blurDataURL='/placeholder.png' layout='fill' priority={true}  src={item.images[0].url} alt={item.title} />
            </div>
          :
          <div className='mediaContainer'></div>
        : 
          <>
            {item.images ? 
              <div className='mediaContainer'>
              <Image className='labelImg' placeholder='blur' blurDataURL='/placeholder.png' layout='fill' priority={true}  src={item.images[0].url} alt={item.title} />
              </div>
            : item.videoLink ?
              <div className='mediaContainer'>
                <iframe 
                  title={item.title} 
                  src={item.videoLink} 
                  frameBorder="0" 
                  allow="fullscreen; picture-in-picture" 
                  allowFullScreen 
                ></iframe>
              </div>
            : 
              <div className='mediaContainer'></div>
            }
          </>
        }
        <div className='cardInfo'>
          <h3 className='title'>{item.title}</h3>
          {item.category ?
            <h4 className='tags'>#{item.category}</h4>
          : null}
        </div>
      </Card>
    </Link>
  );
};

const LabelContainer = styled.div`
  .label__content {
    display: grid;
    grid-template-columns: repeat(1, auto);
  }
  @media (min-width: 480px) {
    .label__content {
      grid-template-columns: repeat(2, calc(100% / 2)) !important;
    }
  }
`;

const Label = ({name, label, adminRoutes}) => {

  return (
    <LabelContainer>
      <StickyTitle>{name}</StickyTitle>
      <div className='label__content'>
        {label.length === 0 ?
          <EmptyCard />
        :
        label.map((item, i) => 
          <LabelCard key={i} item={item} adminRoutes={adminRoutes} />
        )}
      </div>
    </LabelContainer>
  );
};

export default Label;