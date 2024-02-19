import { useState } from 'react';
import { Input } from '../input/Input';
import s from './PostJob.module.scss';

const inputs = [
  {
    title: 'Company/Project',
    placeholder: 'Your Company/Project\'s name',
    type: 'text',
    isOptional: false,
  },
  {
    title: 'Company website (optional)',
    placeholder: 'Your website',
    isOptional: true,
    type: 'text'
  },
  {
    title: 'Email',
    placeholder: 'Your email',
    type: 'email',
    isOptional: false,
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
  },
  {
    title: 'Location (in any form or format, we\'ll make it look nice)',
    placeholder: 'e.g. Global Remote, EMEA Remote, US, San Francisco, etc.',
    type: 'text',
    isOptional: false,
  },
  {
    title: 'Salary (in any form or format, we\'ll make it look nice)',
    placeholder: 'e.g. 100K-200K/year',
    type: 'text',
    isOptional: false,
  },
  {
    title: 'Apply Link (job page on Lever, Greenhouse or any service you’re using as a place where you keep your openings). Can be an email or Google Form too.',
    placeholder: 'Link or email',
    type: 'text',
    isOptional: false,
  },
]

export const PostJob = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);


    const formData = new FormData(e.currentTarget as HTMLFormElement)
    // try {
    //   await fetch('/api/submit', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   setIsSubmitted(true)

    // } catch {
    //   setIsSubmitted(false)
    // }
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
            <form onSubmit={submitForm} className={s.postJob__form}>
              {inputs.map(input => (
                <Input
                  key={input.title}
                  placeholder={input.placeholder}
                  label={input.title}
                  isOptional={input.isOptional}
                  type={input.type}
                />
              ))}
              <button className={s.postJob__form_btn}>Submit</button>
            </form>
          </div>
        </>
        :
        <h2 className={`${s.postJob__title} ${s.postJob__success}`}>You’ve successfully submitted your job info!</h2>
      }
    </section>
  )
}