import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Head from 'next/head';
import axios from 'axios';
import Wrapper from '@/styled-components/common/PageWrapper';
import StickyTitle from '@/styled-components/common/StickyTitle';
import Form from '@/styled-components/common/Form';
import { AdminCont } from '@/context/AdminContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'

const logInSchema = Yup.object().shape({
  username: Yup.string().required('Ingrese un usuario'),
  password: Yup.string().required('Ingrese una contraseña')
});

const LogIn = () => {
  const {setToken} = useContext(AdminCont);
  const router = useRouter();
  async function sendLogForm(values) {
    try {
      let res = await axios.post(`${process.env.NEXT_PUBLIC_APIHOST}/panel/log_in`, values);
      if (res) {
        setToken(res.data);
        localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME, res.data);
        router.push('/');
      }
    } catch(err) {
      if (err) {
        let inputContainer = document.getElementsByClassName('formInput');
        let input = document.getElementsByTagName('input');
        for (let i = 0; i < inputContainer.length; i++) {
          inputContainer[i].classList.add('errorStyle');
          input[i].placeholder= 'Algun dato es incorrecto';
        }
      }
    }
  }

  return (
    <div>
      <Head>
        {/* fonts */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,200&display=swap" 
          rel="stylesheet" />
      </Head>
      <Wrapper>
        <StickyTitle>Ingresar</StickyTitle>
        <Formik
          initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={logInSchema}
        onSubmit={(values, { resetForm }) => {
            resetForm();
            sendLogForm(values);
        }}
        >
          {({errors, touched, handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
              <div className={`formInput ${touched.username ? errors.username ? 'errorStyle' : 'okStyle' : null}`}>
                <label htmlFor='username'>Usuario</label>
                <Field name='username' autoComplete='off' />
              </div>
              <div className={`formInput ${touched.password ? errors.password ? 'errorStyle' : 'okStyle' : null}`}>
                <label htmlFor='password'>Contraseña</label>
                <Field name='password' type='password' autoComplete='off' />
              </div>
              <button type='submit'>
                <span>Ingresar</span>
              </button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </div>
  );
}

export default LogIn;