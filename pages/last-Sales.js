import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSales() {

  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('https://nextjs-section5-e6020-default-rtdb.firebaseio.com/sales.json', fetcher);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://nextjs-section5-e6020-default-rtdb.firebaseio.com/sales.json' )
  //   .then(response => response.json())
  //   .then(data => {
  //     const finalSales = [];
  //     for (const key in data) {
  //       finalSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume
  //       })
  //     }
  //     setSales(finalSales);
  //     setIsLoading(false);
  //   })
  // }, []);

  if (isLoading) {
    return <p>...loading</p>
  }

  if (!sales) {
    return <p>no sales</p>
  }

  return (
    <ul>
      {/* {sales.map((element) => {
        <li key={element.id}>
          {element.username} --- ${element.volume}
          </li>
      })} */}
      <li>I am LastSales!</li>
    </ul>
  )
};

export default LastSales;