import { useState } from 'react';
import s from './Input.module.scss';

interface TInputProps {
  type: string;
  placeholder: string;
  label: string;
  isOptional: boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Input = ({ type = 'text', placeholder, label, isOptional }: TInputProps) => {

  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emailHandler = (email: string) => {
    return emailPattern.test(email)
  }

  const changeValue = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(ev.currentTarget.value)
    if (!isOptional) {
      if (ev.currentTarget.value === '') {
        setIsError(true);
        setErrorMsg("Can't be empty")
      } else {
        if (type === 'email') {
          if (!emailHandler(ev.currentTarget.value)) {
            setIsError(true)
            setErrorMsg('Please enter correct Email')
          } else {
            setIsError(false)
          }
        } else {
          setIsError(false);
        }
      }
    }
  }

  return (
    <div className={s.input__block}>
      <label htmlFor={placeholder} className={s.input__block_label}>{label}</label>
      {
        type !== 'textarea' ?
          <input
            id={placeholder}
            value={value}
            onChange={changeValue}
            type='text'
            className={`${s.input__block_input} ${isError && s.error}`}
            placeholder={placeholder}
          />
          :
          <textarea
            className={`${s.input__block_input} ${s.textarea} ${isError && s.error}`}
            onChange={changeValue} value={value} placeholder={placeholder}
          ></textarea>
      }
      {isError && <div className={s.input__block_error}>{errorMsg}</div>}
    </div>
  )
}