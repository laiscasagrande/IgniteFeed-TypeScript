import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { formatDistance, formatDistanceToNow } from "date-fns"
import {ptBR} from 'date-fns/locale';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author{
  name: string;
  role: string;
  avatarUrl: string
}

interface Content { //Como content é um array, eu faço uma interface separada. É um array com vários objetos dentro
type: 'paragraph' | 'link'; //como o type só pode receber dois tipos de valores, eu coloco dessa forma
content: string,
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[] //mas eu tamém tenho que informar que é um array
}

interface PostProps{ //para resolver o problema do content, eu crio uma interface com todas as propriedades do post e tipo com ela
  post: PostType
}

export function Post({ post }: PostProps) { //para objetos(por mais que seja desestruturação, isso é um objeto, pois está ao redor de chaves). Assim, eu preciso definir qual é o formato do objeto inteiro, e não um só separadamente
  const publishedDateDistance = formatDistance(new Date(), post.publishedAt, { addSuffix: true, locale: ptBR });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR
  })

const [comments, setComments] = useState([
 "Post muito bacana, hein?"
])

const [newCommentText, setNewCommentText] = useState('') //Vou armazenar o que foi digitado na textarea. Eu sempre tenho que inicializar o estado de acordo com o tipo da variável que estou trabalhando. Nesse caso, como é um texto, inicializei com ''.
//Esse estado armazena, em tempo real, tudo que é digitado na textarea

function handleCreateNewComment(event: FormEvent){ //Todas as funções que vêm através de eventos, seja onClick, onChange, onInvalid, onSubmit; automaticamente, o html passa como primeiro parâmetro para essas funções o evento. Mas o typeScript não faz ideia do que é esse evento. Por isso, tenho que passar event como parâmetro em todas as funções
  event.preventDefault()//O typeScript não consegue determinar automaticamente qual é o tipo do evento, o que é esse evento
  //Nesse caso, o evento dessa função é disparado com o onSubmit do formulário, ou seja, é um evento da tag formulário, por isso, colocamos FormEvent
//Agora, se eu der um event. ctrl espaço, ele mostra tudo que eu tenho disponível dentro do evento do tipo FormEvent
setComments([...comments, newCommentText]) 

setNewCommentText('') 
}

function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){ //Como esse evento não foi disparado pelo formulário e sim pelos campos, um input, uma textarea, eu preciso passar um parâmetro para ChangeEvent(porque foi disparado por um onChange, mas ele não sabe em qual campo foi disparado esse onChange). Se aconteceu um evento no seu formulário e não foi disparado pela tag form, então em qual campo foi?
  event.target.setCustomValidity('') 
  setNewCommentText(event.target.value) 
}

function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){

  event.target.setCustomValidity('Esse campo é obrigatório!')
  }

function deleteComment(commentToDelete: string){//tring porque é o comentário que eu quero deletar 
  
 const commentsWithoutDeleteOne = comments.filter(comment => { 
return comment !== commentToDelete 
 }) 
 
 setComments(commentsWithoutDeleteOne) 

}

const isNewCommentEmpty = newCommentText.length === 0 
 return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time title={publishedDateDistance} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>
      <div className={styles.content}>
        {post.content.map((line) => { 
          if (line.type === "paragraph"){
             return <p key={line.content}>{line.content}</p> 
          }else if (line.type === "link"){
            return <p key={line.content}><a href="#">{line.content}</a></p> 
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}> 
        <strong>Deixe seu feedback</strong>
        <textarea 
        placeholder='Deixe um comentário' 
        name="comment"
        onChange={handleNewCommentChange} 
        value={newCommentText} 
        required
        onInvalid={handleNewCommentInvalid} 
        /> 
        <footer>
          <button type="submit"
          disabled={isNewCommentEmpty} 
          >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment key={comment} content={comment} 
          OnDeleteComment={deleteComment}/> 
        })} 
      </div>
    </article >
  )
}

