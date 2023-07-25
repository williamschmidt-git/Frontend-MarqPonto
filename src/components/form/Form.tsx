/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './styles.css';

interface Inputs {
  fieldType: number;
  id: string;
  title: string;
}

export function Form () {
  const [inputs, setInputs] = useState<Inputs[]>([]);
  // const [renderInputs, setRenderInputs] = useState<Inputs[]>([]);
  // const [formState, setFormState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.REACT_APP_API}`);

      const json = await res.json();

      sortArray(json);

      const [separatedArrays] = separateArray(json);

      setInputs(separatedArrays);
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

  function separateArray (array: Inputs[]) {
    console.log(array);
    const half = Math.ceil(array.length / 2);

    const firstHalf = array.slice(0, half);
    const secondHalf = array.slice(half);

    return [firstHalf, secondHalf];
  }

  return(
    <form className='form'>
      {
        inputs.length > 0 ? (<>
          {
            inputs.map((e) => {
              return (
                <div key={e.id}>
                  <label htmlFor={e.title} >
                    {e.title}
                    <input type='text' className='input'/>
                  </label>
                </div>
              );
            })
          }
          <button>Enviar</button>
        </>) : null
      }
    </form>
  );
}