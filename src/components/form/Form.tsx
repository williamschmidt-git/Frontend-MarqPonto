/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../loader/Loader';
import { FormType, Input } from './types';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const defaultForm: FormType = {
  Bem_vindo: '',
  Estado_civil: '',
  Grau_de_instrução: '',
  Nome_da_mãe: '',
  Nome_da_tia: '',
  Nome_do_gato: '',
  Nome_do_pai: '',
  Número_do_RG: '',
  Registro_profissional: '',
  Data_de_nascimento: '',
  Número_da_carteira_de_trabalho: '',
  Número_da_CNH: '',
  PIS_ou_NIS: '',
  Telefone: '',
  Dados_bancários: '',
  Endereço_residencial: '',
};

export function Form () {
  const [inputs, setInputs] = useState<Input[]>([]);
  const [formState, setFormState] = useState<FormType>(defaultForm);
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.REACT_APP_API}`);

      const json = await res.json();

      sortArray(json);

      switchBlankSpaceToUnderscoreOfTitleAttribute(json);

      setInputs(json);
    }

    fetchData();
  }, []);

  function sortArray (array: Input[]) {
    
    array.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      return 0;
    });

    array.sort((a, b) => {
      return a.fieldType - b.fieldType;
    });
  }

  function switchBlankSpaceToUnderscoreOfTitleAttribute(array: Input[]) {
    array.forEach((e) => {
      e.title = e.title.replace(/\s+/g,'_');
    });
  }

  function validate() {
    const checkIfEveryInputIsComplete = Object.values(formState).some((e) => {
      return e.length === 0;
    });

    if(checkIfEveryInputIsComplete) {
      showToastFailMessage();
    } else {
      showToastMessage();
    }
  }

  const showToastMessage = () => {
    toast.success('Dados enviados com sucesso!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const showToastFailMessage = () => {
    toast.error('Verifique se todos os campos estão preenchidos!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    setFormState(prevState => ({
      ...prevState, [name]: value
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validate();
  }

  return(
    <form className='form' onSubmit={(e) => handleSubmit(e)}>
      {
        inputs.length > 0 ? (
          <div className='wrapper'>
            {
              inputs.map((e) => {
                return (
                  <div 
                    key={e.id} 
                    className='input-wrapper'>
                    <label
                      htmlFor={e.title} 
                      className='label'>
                      {e.title.replace(/_/g, ' ')}
                    </label>
                    <input 
                      type='text' 
                      className='input' 
                      name={e.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                );
              })
            }
          </div>
        ) : <Loader />
      }
      <button onClick={validate}>Enviar</button>
      <ToastContainer />
    </form>
  );
}