import { Post, PostType} from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar'
import styles from './App.module.css'
import './global.css'

const posts: PostType[] = [ 
  { 
    id: 1,
    author: { 
      avatarUrl: "http://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @Rocketseat"
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" }, 
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "jane.design/doctorcare" }
    ],
    publishedAt: new Date("2022-05-03 20:00:00") 
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Maik Brito",
      role: "Educator @Rocketseat"
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "jane.design/doctorcare" }
    ],
    publishedAt: new Date("2024-05-10 20:00:00")
  }
]

export function App() {
  return ( 
    <>
      <Header /> 
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {   
        return (  
        <Post 
        key={post.id} 
        // author= {post.author} 
        // content={post.content} //por mais que lá no meu post eu tenha falado que o conteúdo só pode ter, obrigatoriamente, dois tipos, pro typeScrip, ele entede que o content é ums sring
        // publishedAt={post.publishedAt} //ao invés de colocar tudo, eu envio o post
        post={post} //assim, cada vez que eu tiver uma propriedade nova, eu não preciso passar lá, pois já estou trazendo tudo aqui
        />//Assim, veja que, quando tinha o content, o typeScript estava falando que era e que tinha que ser uma string. Com essa mudança, content continua sendo um array com type podendo ser de dois tipos, mas agora, a única propriedade que estou passando é o post, eu eu declarei que é uma string. Agora, não irá dar mais problemas
        )
          })}
        </main>
      </div>
    </>
  )
}
