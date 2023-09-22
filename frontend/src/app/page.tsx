import ReactMarkdown from 'react-markdown'
import classes from './Page.module.css';
import NewsCard from "../../components/NewsCard/NewsCard";

const API_URI = process.env.API_URI;
const API_TOKEN = process.env.API_TOKEN

console.log('API_URI', API_URI)
console.log('APP_TOKEN', API_TOKEN)

export default async function Home() {

  interface RequestInit extends RequestInit {
    next?: { revalidate?: number }
  }

  // noinspection TypeScriptValidateTypes
  const articleRes = await fetch(`${API_URI}/api/hero-article`,{
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      ContentType: "application/json"
    },
    next: { revalidate: 60 }
  })

  const articleData = await articleRes.json();
  const article = articleData.data

  // noinspection TypeScriptValidateTypes
  const newsRes = await fetch(`${API_URI}/api/news-items?populate=preview`,{
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      ContentType: "application/json"
    },
    next: { revalidate: 60 },
  })
  const newsData = await newsRes.json();
  console.log('newsData.meta', newsData.meta)
  const news = newsData.data
  // console.log('news', news)

  return (
    <main className={classes.container}>
      <h2 className={classes.title}>Госкорпорация РосКосмос - новости</h2>
      <div className={classes.article}>
        <ReactMarkdown children={article.attributes.text} />
      </div>
      <h3 className={classes.subTitle}>Новости</h3>
      <div className={classes.list}>
        {news.map((newsItem, ind)=>{
          return (
            <NewsCard
              key={ind}
              tile={newsItem.attributes.title}
              description={newsItem.attributes.description}
              imgUrl={newsItem.attributes.preview.data.attributes.url}
            />
          )
        })}
      </div>
    </main>
  )
}
