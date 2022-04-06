import { Fragment } from 'react';
import fs from 'fs';
import path from 'path'; 

function ProductPage({loadedProduct}) {

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find(product => product.id === productId);

  return {
    props: {
      loadedProduct: product
    }
  }
};

export default ProductPage;