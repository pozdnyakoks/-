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

export const PostJob = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm()

  const onSubmit = methods.handleSubmit(data => {
    // console.log(data)
    setIsSubmitted(true);
    // const formData = new FormData(e.currentTarget as HTMLFormElement)
  })

  return (
    <section className={`${s.postJob} container`}>
      {!isSubmitted ?
        <>
          <div className={s.postJob__block}>
            <h2 className={s.postJob__title}>Post a Job</h2>
            <p className={s.postJob__desc}>
              We’re the only job board in Cosmos and tailored specifically for companies that search talents in the ecosystem. We charge 20 ATOMs per job post. We’ll be contacting you once you’ve submitted your job info.
            </p>
            <FormProvider {...methods}>
              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
                className={s.postJob__form}>
                {inputs.map(input => (
                  <Input
                    key={input.title}
                    placeholder={input.placeholder}
                    label={input.title}
                    isOptional={input.isOptional}
                    type={input.type}
                    name={input.name}
                  />
                ))}
                <button onClick={onSubmit} className={s.postJob__form_btn}>Submit</button>
              </form>
            </FormProvider>
          </div>
        </>
        :
        <h2 className={`${s.postJob__title} ${s.postJob__success}`}>You’ve successfully submitted your job info!</h2>
      }
    </section>
  )
}