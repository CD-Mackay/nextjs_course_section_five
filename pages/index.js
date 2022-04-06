import fs from "fs";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((element) => {
          <Link key={element.id} href={`/${element.id}`}>
            <li>{element.title}</li>
          </Link>
      })}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("regenerating!!!");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 30,
  };
}

export default HomePage;
