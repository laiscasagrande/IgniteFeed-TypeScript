import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'
import { ThumbsUp, Trash } from 'phosphor-react'

interface CommentProps {
    content: string,
    OnDeleteComment: (comment: string) => void//para tipagem de funções, eu coloco uma arrow function. Se você for ver a função, ela faz alguma coisa, mas não tem nenhum return. Ou seja, ela não retorna nada. Aí coloco void.
}//porém, como deleteComment, lá no post, é uma string, eu preciso passar o parâmetro comment aqui e definir como string. O nome que eu dei aqui, comment, não precisa ser o mesmo que eu dei lá n função, até porqur lá está como commentToDelete
//O nome que eu coloquei não importa, eu só preciso avisar para o typeScript que essa função precisa de um parâmetro e tem que ser string, pois lá na outra função, o deleteComment, tem um parâmetro, que é uma string

export function Comment({ content, OnDeleteComment }: CommentProps) {

    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {  
        OnDeleteComment(content) //percebar que OnDeleteComment faz alguma coisa, mas não retorna nada. Não há nenhum retorno, ou seja, não tem um "faça essa lógica" e depois uma lógica dentro da função para ela retornar alguma coisa
    }
   
    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1 
        })
    }
    
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/laiscasagrande.png" alt="" /> 
            <div className={styles.commentBox}>
                <div className={styles.commentContext}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diego Fernandes</strong>
                            <time title="11 de maio às 08:13h" dateTime='2022-05-11 08:13:30'>Cerca de 2h atrás</time>
                        </div>
                        <button title='Deletar comentário' onClick={handleDeleteComment}> 
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>

                </footer>
            </div>
        </div>
    )
}
