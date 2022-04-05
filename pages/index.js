import { Fragment } from "react";
import Head from "next/head";

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
  return {
    props: {
      products: [{id: 'p1', title: 'product 1'}],
    }
  }
}

export default HomePage;
