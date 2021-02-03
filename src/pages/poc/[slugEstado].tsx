import { SubTitle } from '@/styles/pages/Home';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IEstado {
  sigla: string;
  nome: string;  
  cidades: string[];
}

interface IEstadoProps {
  estados: IEstado[];
}

export default function Estado( { estados}: IEstadoProps ) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <SubTitle><a href="javascript:history.back()">Voltar</a></SubTitle>
      <h1>{ String(router.query.slugEstado).toUpperCase() }</h1>

      <ul>
        { estados[0].cidades.map(cidade => {
          return (
            <li key= {cidade}>
              {cidade}
            </li>
          );
        })}
      </ul>  
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/estados`);
  const estados = await response.json();

  const paths = estados.map(estado => {
    return {
      params: { slugEstado: estado.sigla }
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<IEstadoProps> = async (context) => {
  var { slugEstado } = context.params;
  const response = await fetch(`http://localhost:3333/estados?sigla=${String(slugEstado).toUpperCase()}`);
  const estados = await response.json();

  return {    
    props: {
      estados
    }, 
    revalidate: 3,
  }

}