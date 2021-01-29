import { GetServerSideProps } from 'next';
import { Title, SubTitle } from '@/styles/pages/Home'
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}

export default function Home() {

  return (
    <div>
      <SEO 
        title="DevCommerce, your best ecommerce!" 
        image="boost.jpg"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Tipo de Carregamento</Title>
        <ul>
          <li><SubTitle><a href="../poc/client-side-fetching">Renderização do lado do Cliente (Client-side Rendering)</a></SubTitle></li>
          <li><SubTitle><a href="../poc/server-side-rendering">Renderização do lado do Servidor (Server-side Rendering)</a></SubTitle></li>
          <li><SubTitle><a href="../poc/static-site-genereation">Geração Estática (Static Generation)</a></SubTitle></li>
          <li><SubTitle><a href="../poc/mg">Página Estática Dinâmica (Dynamic Static Page)</a></SubTitle></li>
        </ul>
      </section>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);  
//   const recommendedProducts = await response.json();

//   return {
//     props: {
//       recommendedProducts,
//     }
//   }
// }
