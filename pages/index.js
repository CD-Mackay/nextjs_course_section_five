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

export async function getStaticProps(context) {
  
  console.log("regenerating!!!");
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products
    },
    revalidate: 30
  }
}

export default HomePage;
