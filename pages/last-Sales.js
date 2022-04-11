import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  const { data, error } = useSWR(
    "https://nextjs-section5-e6020-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const finalSales = [];
      for (const key in data) {
        finalSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(finalSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>...loading</p>;
  }

  return (
    <ul>
      {sales.map((element) => {
        return (
          <li key={element.id}>
            {element.username} --- ${element.volume}
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://nextjs-section5-e6020-default-rtdb.firebaseio.com/sales.json")
  const data = await response.json();

      const finalSales = [];

      for (const key in data) {
        finalSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return {
        props: {
          sales: finalSales,
        }
      };
}

export default LastSales;
