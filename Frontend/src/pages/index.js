import styles from "../styles/styles.module.css"
export default function Home({ books }) {
  return (
    <div className="container">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}>
        {books.map(book => (
          <div className={styles.card} key={book.id}>
            <h2>{book.title}</h2>
            <h3>{book.author.name}</h3>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://dca5-131-221-13-190.ngrok.io/books")
  const books = await res.json()
  console.log(books)
  return {
    props: {
      books,
    },
    revalidate: 10,
  }
}
