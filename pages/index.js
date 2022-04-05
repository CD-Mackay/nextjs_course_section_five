import { Fragment } from "react";
import Head from "next/head";
import fs from 'fs';
import path from 'path';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((element) => {
        return <li key={element.id}>{element.title}</li>
      })}
    </ul>
  );
};

export async function getStaticProps() {

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products
    }
  }
}

export default HomePage;
