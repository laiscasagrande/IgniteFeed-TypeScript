import styles from './Header.module.css' //como é um module, não posso só importar o css, tenho que dar um nome. Eu uso o  odule para a estilização deste componente não afetar os outros componentes
//o module gera para cada classe que estamos utilizando um hash, que é uma classe única, para que essa mesma classe não interfira em outros componentes
import igniteLogo from '../assets/ignite-logo.svg'
export function Header() { //componentes react sempre com a primeira letra maiúscula
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logotipo do Ignite" />
    </header>
  )
}