import { useEffect, useState } from 'react';
import { SubTitle, Title } from '@/styles/pages/Home'

interface IEstado {
  sigla: string;
  nome: string;  
  cidades: string[];
}

export default function Home() {
  const [estados, setEstados] = useState<IEstado[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/estados').then(response => {
      response.json().then(data => {
        setEstados(data);
      })
    })

  }, []);

  return (
    <div>
      <SubTitle><a href="http://localhost:3000/">Voltar</a></SubTitle>
      <section>
        <Title>Estados / Cidades</Title>
        <ul>
          { estados.map(estado => {
            return (
              <li key= {estado.sigla}>
                <a href={`http://localhost:3000/poc/${estado.sigla}`}>{estado.nome}</a>
                <ul>
                  { estado.cidades.map(cidade => {
                    return (
                      <li key= {cidade}>
                        {cidade}                      
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

    </div>
  )
}
