import styled from 'styled-components';
import StickyTitle from '@/styled-components/common/StickyTitle';
import EmptyCard from '@/styled-components/EmptyCard';
import Link from '@/styled-components/common/Link';

const Item = styled.section`
  cursor: pointer;
  margin-bottom: 2.6rem;
  .itemWrapper {
    display: flex;
    flex-direction: row;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        transform: rotate(90deg);
      }
    }
    .info {
      padding-left: 1.6rem;
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
  }
  @media (hover: hover) {
    .itemWrapper:hover .title { 
      color: ${props => props.theme.colors.green};
      font-style: italic;
    }
  }
  @media (min-width: 920px) {
    .info {
      .title {
        font-size: 2.8rem !important;
      }
      .tags {
        font-size: 2.2rem !important; 
      }
    }
  }
`;

const LinkItem = ({item, adminRoutes}) => {
  return (
    adminRoutes ? 
    <Link href={`/panel/${item.label}?folder=${item.route_title}`} className='link'>
      <Item>
        <div className='itemWrapper'>
          <div className='icon'>
            <span className='material-icons'>link</span>
          </div>
          <div className='info'>
            <h3 className='title'>{item.title}</h3>
            {item.category ?
              <h4 className='tags'>#{item.category}</h4>
            : null}
          </div>
        </div>
      </Item>
    </Link>
    :
    <a href={item.description} target='_blank' rel='noreferrer' className='link'>
      <Item>
        <div className='itemWrapper'>
          <div className='icon'>
            <span className='material-icons'>link</span>
          </div>
          <div className='info'>
            <h2 className='title'>{item.title}</h2>
            {item.category ?
              <h3 className='tags'>#{item.category}</h3>
            : null}
          </div>
        </div>
      </Item>
    </a>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = ({label, adminRoutes}) => {
  return (
    <ListContainer>
      <StickyTitle>Publicaciones</StickyTitle>
      <div>
        {label.length === 0 ?
          <EmptyCard />
          : 
          label.map((item, i) => <LinkItem key={i} item={item} adminRoutes={adminRoutes} />)}
      </div>
    </ListContainer>
  );
};

export default List;