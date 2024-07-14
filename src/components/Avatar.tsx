import { ImgHTMLAttributes } from 'react'; 
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{ //estendemos a propriedade ImgHTMLAttributes, que são todas as propriedades que uma imagem pode ter
    hasBorder?: boolean; //quando eu tenho uma propriedade que náo é obrigatória, ou seja, é uma propriedade que eu não quero passar para todos os componentes, eu coloco um ?
    // src: string; //temos que passar nos generics (<>), que se trata de uma imagem do elemento HTML
    // alt?: string; //Agora, todas as propriedades que existem em uma tag HTML eu não preciso passar aqui, pois todas elas já existem na tag img e eu extendi colocando isso ImgHTMLAttributes
    // title?:string
}

export function Avatar({hasBorder = true, ...props}: AvatarProps) { //Porém, se queremos usar essas outras propriedades da imagem em outro lugar onde estamos exportando o componente Avatar temos que usar um rest operator
//O rest operator quer dizer que eu tenho todas as propriedades menos o hasBorder, ou seja, eu estou tirando o hasBorder dentro do objeto de propriedades, e o que sobrou, ou seja, o resto, por isso rest operator, eu estou jogando dentro de um objeto chamado props
return (
        <img className={hasBorder ? styles.avatarWithBorder : styles.avatar}
        // src={src} 
        // alt={alt} 
        // title={title}
        {...props} //eu tiro todas as propriedades que eeu estava passando e coloco um spread operator, para pegar cada valor que eu tenho dentro do objeto props (o rest), e passando como uma propriedade para a minha tag img
        //veja que agora em nenhum momento eu passei a propriedade alt, src, mas eu tenho acesso a essas propriedade onde estou importando este componente
        //estamos pegando todas as propriedades que existem nas imagens e passando para nossa tag img
        />
    )
}
//Quando temos um componente e o retorno dele é uma tag html, como img, nesse caso, ou um button. Qundo chamamos esse componente am algum lugar e queremos usar as propriedades dessa tag, a tag img tem várias propriedades, por exemplo, nós podemos usar uma propriedade que o typeScript chama de extensão  