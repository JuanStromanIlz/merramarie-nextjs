import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Form from '@/styled-components/common/Form';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AdminCont } from '@/context/AdminContext';

const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const FileUploader = ({ form, field }) => {
  const handleChange = event => {
    const fileUploaded = event.target.files;
    form.setFieldValue(field.name, fileUploaded)
  };
  return (
    <input 
      type='file'
      accept='.jpg,.jpeg,.gif,.png'
      onChange={handleChange}
      multiple
    /> 
  );
};

const ItemSchema = Yup.object().shape({
  title: Yup.string().required('Ingrese un titulo'),
  category: Yup.string(),
  description: Yup.string()
  .test((value, {parent, createError}) => {
    return !value && !parent.videoLink && parent.images.length === 0 ? 
      createError({
        path: 'global',
        message: 'uno de estos campos es obligatorio'
      })
    : true;
  }),
  videoLink: Yup.string()
  .test((value, {parent, createError}) => {
    return !value && !parent.description && parent.images.length === 0 ? 
      createError({
        path: 'global',
        message: 'uno de estos campos es obligatorio'
      })
    : true;
  }),
  images: Yup.mixed()
    .test((value, {createError}) => {
      let arrayOfImgs = Array.from(value)
      let error = false;
      // Se cambio el metodo map por un forIn
      for (const key in arrayOfImgs) {
        const img = arrayOfImgs[key];
        if (img.size > FILE_SIZE) {
          error = true;
        }
        if (!SUPPORTED_FORMATS.includes(img.type)) {
          error = true;
        }
      }
      return error ?
        createError({
          path: 'images',
          message: 'Las imagenes deben ser jpg, jpeg, gif o png y no deben superar los 5mb'
        })
        : true
    })
  });

function NewDoc() {
  const router = useRouter();
  const {token} = useContext(AdminCont);
  async function sendValues(values) {
    for (let propName in values) {
      if (values[propName] === null || values[propName] === undefined || values[propName].length === 0) {
        delete values[propName];
      }
    }
    if ('images' in values) {
      try {
        let newItemForm = new FormData();
        for (const key in values) {
          const element = values[key];
          if (key === 'images') {
            for (let i = 0; i < element.length; i++) {
              newItemForm.append('images', element[i]);
            }
          } else {
            newItemForm.append(key, element);
          }
        }
        let res = await axios({
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_APIHOST}/panel/new_with_imgs`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: newItemForm
        });
        if (res.status === 201) {
          let title = values.title.trim();
          title = title.toLowerCase();
          title = title.replace(/ /g, '_');
          router.push(`/${values.label}/${title}`);
        }
      } catch(err) {
        router.push('/error');
      }
    } else {
      try {
        let res = await axios({
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_APIHOST}/panel/new`,
          withCredentials: true,
          headers: {
            'authorization': `Bearer ${token}`
          },
          data: values
        });
        if (res.status === 201) {
          let title = values.title.trim();
          title = title.toLowerCase();
          title = title.replace(/ /g, '_');
          router.push(`/${values.label}/${title}`);
        }
      } catch(err) {
        router.push('/error');
      }
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
         label: 'editorial',
         category: '',
         title: '',
         description: '',
         videoLink: '',
         images: []
       }}
       validationSchema={ItemSchema}
       onSubmit={(values, { resetForm })=> {
         sendValues(values);
         resetForm();
       }}
      >
        {({values, errors, touched, handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <div className={`formInput formInput__label ${touched.label ? errors.label ? 'errorStyle' : 'okStyle' : null}`}>
              <label htmlFor='label'>Label</label>
              <Field as='select' name='label'>
                <option value='editorial'>editorial</option>
                <option value='artwork'>artwork</option>
                <option value='commercial'>commercial</option>
                <option value='films'>films</option>
                <option value='blog'>blog</option>
                <option value='publications'>publications</option>
              </Field>
            </div>
            <div className={`formInput ${touched.title ? errors.title ? 'errorStyle' : 'okStyle' : null}`}>
              <label htmlFor='title'>Titulo</label>
              <Field name='title' autoComplete='off' placeholder={errors.title && touched.title ? errors.title : null} />
            </div>
            <div className={`formInput ${touched.category ? errors.category ? 'errorStyle' : 'okStyle' : null}`}>
              <label htmlFor='category'># Categoria</label>
              <Field name='category' autoComplete='off' />
            </div>
            <div className={`formInput ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
              <label htmlFor='description'>{values.label === 'publications' ? 'Link Externo' : 'Descripción'}</label>
              {values.label !== 'publications' ? 
                <Field as='textarea' rows='5' name='description' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />
              : <Field name='description' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />}
            </div>
            {values.label !== 'publications' ? 
              <>
                <div className={`formInput ${touched.description && touched.videoLink && touched.images ? errors.global ? 'errorStyle' : 'okStyle' : null}`}>
                  <label htmlFor='videoLink'>Video Link</label>
                  <Field name='videoLink' autoComplete='off' placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null} />
                </div>
                <div className={`formInput formInput__images ${touched.description && touched.videoLink && touched.images ? errors.global || errors.images ? 'errorStyle' : 'okStyle' : null}`}>
                  <label htmlFor='images'>Imagenes</label>
                  <Field
                    name='images' 
                    component={FileUploader}
                    placeholder={errors.global && touched.description && touched.videoLink && touched.images ? errors.global : null}
                  />
                  <div className={`errorWrapper ${touched.description && touched.videoLink && touched.images ? errors.global || errors.images ? 'showError' : null : null}`}>
                    <div>
                      <span>{errors.global || errors.images}</span>
                    </div>
                  </div>
                </div>
              </>
            : null}
            <button type='submit'>
              <span>Crear</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewDoc;