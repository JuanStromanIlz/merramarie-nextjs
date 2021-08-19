import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Wrapper from '@/styled-components/common/PageWrapper';
import Footer from '@/styled-components/common/Footer';
import Folder from '@/styled-components/Folder';
import Nav from '@/styled-components/common/Nav';
import EditFolder from '@/utility/EditFolder';
import { AdminCont } from '@/context/AdminContext';
import { useContext, useState, useEffect } from 'react';
import AdminNav from '@/styled-components/common/AdminNav';

const FolderPanelView = () => {
  const [edit, setEdit] = useState(false);
  const [folderInfo, setFolderInfo] = useState({});
  const {token} = useContext(AdminCont);
  const router = useRouter();
  const { label, folder } = router.query;
  async function deleteItem() {
    try {
      let res = await axios({
        method: 'delete',
        url: `https://merramarieportfolio.herokuapp.com/panel/delete/${label}/${folder}`,
        withCredentials: true,
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      if (res) {
        router.push(`/${folder.label}`);
      }
    } catch(err) {
      router.push('/error');
    }
  }
  async function saveEdit(values) {
    let formWithImages = false;
    let newForm = values;
    delete newForm.images;
    let formToCompare = {
      label: folder.label,
      category: folder.category,
      title: folder.title,
      description: folder.description,
      videoLink: folder.videoLink
    };
    let formToSave = {};
    //Check if there're new images
    if ('newImages' in newForm) {
      formWithImages = true;
      formToSave['images'] = newForm.newImages; 
      delete newForm.newImages;
    }
    //Compare the entries to see if there are any changes
    for (let propName in newForm) {
      if (newForm[propName] !== formToCompare[propName]) {
        formToSave[propName] = newForm[propName];
      }
      //Add deleteImgs to the formToSave array
      if (propName === 'deleteImgs') {
        formToSave[propName] = newForm[propName].toString();
      }
    }
    if (formWithImages) {
      try {
        let sendForm = new FormData();
        for (const key in formToSave) {
          const element = formToSave[key];
          if (key === 'images') {
            for (let i = 0; i < element.length; i++) {
              sendForm.append('images', element[i]);
            }
          } 
          else {
            sendForm.append(key, element);
          }
        }
        let res = await axios({
          method: 'patch',
          url: `https://merramarieportfolio.herokuapp.com/panel/edit_new_imgs/${label}/${title}`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: sendForm
        });
        if (res.status === 201) {
          let newTitle = values.title.trim();
          newTitle = newTitle.toLowerCase();
          newTitle = newTitle.replace(/ /g, '_');
          router.push(`/panel/${values.label}?folder=${newTitle}`);
        }
      } catch (err) {
        router.push('/error');
      }
    } else {
      try {
        let res = await axios({
          method: 'patch',
          url: `https://merramarieportfolio.herokuapp.com/panel/edit/${label}/${title}`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: formToSave
        });
        if (res.status === 201) {
          let newTitle = values.title.trim();
          newTitle = newTitle.toLowerCase();
          newTitle = newTitle.replace(/ /g, '_');
          router.push(`/panel/${values.label}?folder=${newTitle}`);
        }
      } catch (err) {
        router.push('/error');
      }
    }
  }
  useEffect(()=> {
    const fetchFolder = () => {
      axios.get(`https://merramarieportfolio.herokuapp.com/panel/${label}/${folder}`, {
        withCredentials: true,
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        setFolderInfo(res.data);
      }).catch(err => {
        router.push('/error');
      });
    }
    fetchFolder();
  },[label, folder]);

  return (
    <div>
      <Head>
        {/* icon */}
        <link rel='shortcut icon' href='/heart.svg'/>
        {/* type */}
        <meta property='og:type' content='website'/>
        {/* title */}
        <title>Editar documento || Merra Marie</title>
        <meta property='og:title' content='Editar documento || Merra Marie'/>
        <meta name='twitter:title' content='Editar documento || Merra Marie'/>
        {/* description */}
        <meta name='description' content='Edicion de la carpeta.'/>
        <meta property='og:description' content='Edicion de la carpeta.'/>
        <meta name='twitter:description' content='Edicion de la carpeta.'/>
        {/* url */}
        <link rel='canonical' href={`https://merramarie-next.vercel.app/${label}/${folder}`}/>
        <meta property='og:url' content={`https://merramarie-next.vercel.app/${label}/${folder}`}/>
        <meta name='twitter:url' content={`https://merramarie-next.vercel.app/${label}/${folder}`}/>
        {/* image */}
        <meta name='twitter:image' content='/heart.png'/>
        <meta name='twitter:image:secure_url' content='/heart.png'/>
        <meta property='og:image' content='/heart.png'/>
        <meta property='og:image:secure_url' content='/heart.png'/>
        <meta property='og:image:width' content='/heart.png'/>
        <meta property='og:image:height' content='/heart.png'/>
      </Head>
      <Nav />
      <AdminNav setEdit={setEdit} edit={edit} deleteItem={deleteItem} />
      <Wrapper>
        {edit ? 
          <EditFolder folder={folderInfo} sendEdit={saveEdit}/> :
          <Folder folder={folderInfo} />
        }
      </Wrapper>
      <Footer label={folderInfo.label} nextFolder={folderInfo.nextFolder} />
    </div>
  );
}

export default FolderPanelView;