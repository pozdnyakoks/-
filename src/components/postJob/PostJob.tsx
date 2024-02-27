'use client'

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Input } from '../input/Input';
import s from './PostJob.module.scss';

const inputs = [
  {
    title: 'Company/Project',
    placeholder: 'Your Company/Project\'s name',
    type: 'text',
    isOptional: false,
    name: 'Company'
  },
  {
    title: 'Company website (optional)',
    placeholder: 'Your website',
    isOptional: true,
    type: 'text',
    name: 'Company Website'
  },
  {
    title: 'Email',
    placeholder: 'Your email',
    type: 'email',
    isOptional: false,
    name: 'Email'
  },
  {
    title: 'Job details (in any form or format, we\'ll make it look nice)',
    placeholder: `Usually people have:
    Project/ company description
    Duties and responsibilities;
    Required qualifications;
    Benefits`,
    type: 'textarea',
    isOptional: false,
    name: 'Details'
  },
  {
    title: 'Location (in any form or format, we\'ll make it look nice)',
    placeholder: 'e.g. Global Remote, EMEA Remote, US, San Francisco, etc.',
    type: 'text',
    isOptional: false,
    name: 'Location'
  },
  {
    title: 'Salary (in any form or format, we\'ll make it look nice)',
    placeholder: 'e.g. 100K-200K/year',
    type: 'text',
    isOptional: false,
    name: 'Salary'
  },
  {
    title: 'Apply Link (job page on Lever, Greenhouse or any service you’re using as a place where you keep your openings). Can be an email or Google Form too.',
    placeholder: 'Link or email',
    type: 'text',
    isOptional: false,
    name: 'Apply Link'
  },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const PostJob = () => {

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const methods = useForm()

  // const onSubmit = methods.handleSubmit(data => {

  //   fetch("/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: encode({ "form-name": "postJob", ...data })
  //   })
  //     .then(() => {
  //       setTimeout(() => {
  //         setIsSubmitted(true);

  //       }, 3000)
  //     })
  //     .catch(error => console.log(error));

  // })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onChange',
  })
  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();
    // console.log(data)

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "postJob", ...data })
    })
      .then(() => {
        setTimeout(() => {
          setIsSubmitted(true);

        }, 2000)
      })
      .catch(error => console.log(error))
  })

  // let validationRules = {};

  // if (!isOptional) {
  //   validationRules = {
  //     required: {
  //       value: true,
  //       message: "Can't be empty",
  //     },
  //     pattern: {
  //       value: type === 'email' ? emailPattern : /.+/,
  //       message: 'Please enter correct Email'
  //     }
  //   };
  // }

  const validate = (type: string) => {
    return {
      required: {
        value: true,
        message: "Can't be empty",
      },
      pattern: {
        value: type === 'email' ? emailPattern : /.+/,
        message: 'Please enter correct Email'
      }
    };
  }

  return (
    <section className={`${s.postJob} container`}>
      {!isSubmitted ?
        <>
          <div className={s.postJob__block}>
            <h2 className={s.postJob__title}>Post a Job</h2>
            <p className={s.postJob__desc}>
              We’re the only job board in Cosmos and tailored specifically for companies that search talents in the ecosystem. We charge 20 ATOMs per job post. We’ll be contacting you once you’ve submitted your job info.
            </p>
            {/* <FormProvider {...methods}> */}
            <form
              method="POST"
              data-netlify="true"
              name='postJob'
              netlify-honeypot="bot-field"
              noValidate
              autoComplete="off"
              // onSubmit={onSubmit}
              className={s.postJob__form}>
              <input type="hidden" name="postJob" value="postJob" />
              {inputs.map(({ placeholder, title, name, type }) => (
                // <>
                  <div className={s.input__block} key={title}>
                    <label htmlFor={placeholder} className={s.input__block_label}>{title}</label>
                    {
                      type !== 'textarea' ?
                        <input
                          id={placeholder}
                          type='text'
                          className={`${s.input__block_input} 
                        ${errors[name] && s.error}
                        `}
                          placeholder={placeholder}
                          // {...register(name, validate(type))}

                        />
                        :
                        <textarea
                          id={placeholder}
                          className={`${s.input__block_input} ${s.textarea} 
                        ${errors[name] && s.error}
                        `}
                          placeholder={placeholder}
                          // {...register(name, validate(type))}
                        ></textarea>
                    }
                    {
                      errors[name] && <div className={s.input__block_error}>{errors[name]?.message as string}</div>
                    }
                  </div>
                // </>
              ))}
              <button
                // onClick={onSubmit} 
                className={s.postJob__form_btn}>Submit</button>
            </form>
            {/* </FormProvider> */}

          </div>
        </>
        :
        <h2 className={`${s.postJob__title} ${s.postJob__success}`}>You’ve successfully submitted your job info!</h2>
      }
    </section>
  )
}

{/* <Input
key={input.title}
placeholder={input.placeholder}
label={input.title}
isOptional={input.isOptional}
type={input.type}
name={input.name}
/> */}



{/* <form name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
                <p>
                  <label>Your Name: <input type="text" name="name" /></label>
                </p>
                <p>
                  <label>Your Email: <input type="email" name="email" /></label>
                </p>
                <p>
                  <label>Your Role: <select name="role[]" multiple>
                    <option value="leader">Leader</option>
                    <option value="follower">Follower</option>
                  </select></label>
                </p>
                <p>
                  <label>Message: <textarea name="message"></textarea></label>
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
            </form> */}