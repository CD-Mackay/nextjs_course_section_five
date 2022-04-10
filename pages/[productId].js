import { Fragment } from "react";
import fs from "fs";
import path from "path";

function ProductPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>...loading</p>
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  };

  return {
    props: {
      loadedProduct: product,
    },
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const params = ids.map((element) => ({ params: { productId: element } }));

  return {
    paths: params,
    fallback: true,
  };
}

export default ProductPage;
