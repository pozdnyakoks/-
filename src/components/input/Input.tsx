import { useFormContext } from 'react-hook-form';
import s from './Input.module.scss';

interface TInputProps {
  type: string;
  placeholder: string;
  label: string;
  isOptional: boolean;
  name: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Input = ({ type = 'text', placeholder, label, isOptional, name }: TInputProps) => {
  const { register, formState: { errors } } = useFormContext();

  let validationRules = {};

  if (!isOptional) {
    validationRules = {
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
    <div className={s.input__block}>
      <label htmlFor={placeholder} className={s.input__block_label}>{label}</label>
      {
        type !== 'textarea' ?
          <input
            id={placeholder}
            type='text'
            className={`${s.input__block_input} 
            ${errors[name] && s.error}
            `}
            placeholder={placeholder}
            {...register(name, validationRules)}

          />
          :
          <textarea
            id={placeholder}
            className={`${s.input__block_input} ${s.textarea} 
            ${errors[name] && s.error}
            `}
            placeholder={placeholder}
            {...register(name, validationRules)}
          ></textarea>
      }
      {
        errors[name] && <div className={s.input__block_error}>{errors[name]?.message as string}</div>
      }
    </div>
  )
}
