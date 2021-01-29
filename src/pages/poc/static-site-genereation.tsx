import { GetStaticProps } from "next";
import { SubTitle, Title } from '@/styles/pages/Home'

interface IEstado {
  sigla: string;
  nome: string;  
  cidades: string[];
}

interface IHomeProps {
  estados: IEstado[];
}

export default function Top10({ estados }: IHomeProps) {
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

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const response = await fetch('http://localhost:3333/estados');
  const estados = await response.json();

  return {
    props: {
      estados
    }, 
    revalidate: 5,
  }

}