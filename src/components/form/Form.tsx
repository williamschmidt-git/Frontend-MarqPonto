/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './styles.css';

interface Inputs {
  fieldType: number;
  id: string;
  title: string;
}

type Form = {
  Bem_vindo: string;
  Estado_civil: string;
  Grau_de_Instrução: string;
  Nome_da_mãe: string;
  Nome_da_tia: string;
  Nome_do_gato: string;
  Nome_do_pai: string;
  Número_do_RG: string;
  Registro_profissional: string;
  Data_de_nascimento: string;
  Número_da_carteira_de_trabalho: string;
  Número_da_CNH: string;
  PIS_ou_NIS: string;
  Telefone: string;
  Dados_bancários: string;
  Endereço_residencial: string;
}

const defaultForm: Form = {
  Bem_vindo: '',
  Estado_civil: '',
  Grau_de_Instrução: '',
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
  const [inputs, setInputs] = useState<Inputs[]>([]);
  const [secondTable, setSecondTable] = useState<Inputs[]>([]);
  const [formState, setFormState] = useState<Form>(defaultForm);

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

  function sortArray (array: Inputs[]) {
    
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

  function switchBlankSpaceToUnderscoreOfTitleAttribute(array: Inputs[]) {
    array.forEach((e) => {
      e.title = e.title.replace(/\s+/g,'_');
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    setFormState(prevState => ({
      ...prevState, [name]: value
    }));
  }

  return(
    <form className='form'>
      {
        inputs.length > 0 ? (
          <div className='wrapper'>
            {
              inputs.map((e) => {
                return (
                  <div key={e.id} className='input-wrapper'>
                    <label htmlFor={e.title} className='label'>
                      {e.title}
                    </label>
                    <input type='text' className='input' name={e.title} 
                      onChange={handleChange}/>
                  </div>
                );
              })
            }
          </div>
        ) : null
      }

      <button>Enviar</button>

    </form>
  );
}