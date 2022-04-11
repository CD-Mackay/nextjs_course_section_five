import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSales() {

  const [sales, setSales] = useState([]);
  const { data, error } = useSWR('https://nextjs-section5-e6020-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));

  useEffect(() => {
    if (data) {
      const finalSales = [];
          for (const key in data) {
            finalSales.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume
            })
          };
          setSales(finalSales);
    }
  }, [data])

  if (error) {
    return <p>Failed to load</p>
  }

  if (!data || !sales) {
    return <p>...loading</p>
  }

  return (
    <ul>
      {sales.map((element) => {
       return <li key={element.id}>
          {element.username} --- ${element.volume}
          </li>
      })}
    </ul>
  )
};

export default LastSales;