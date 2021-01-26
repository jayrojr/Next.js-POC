import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents'

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  async function handleSum() {
    const math = (await import ('@/lib/math')).default;
    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO 
        title="DevCommerce, your best ecommerce!" 
        image="boost.jpg"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>
        <ul>
          { recommendedProducts.map(recommendedProduct => {
            return (
              <li key= {recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`} >
                  <a>
                    { PrismicDom.RichText.asText(recommendedProduct.data.title)}
                  </a>                  
                </Link>                
              </li>
            );
          })}
        </ul>
      </section>
      {/* <button onClick={handleSum}>Sum!</button> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}
