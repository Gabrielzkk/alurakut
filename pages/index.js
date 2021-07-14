import styled from "styled-components";
import MainGrid from '../src/componentes/MainGrid';
import Box from "../src/componentes/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/componentes/ProfileRelations"


function ProfileSideBar(props) {
  console.log(props);
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home() {

  const githubUser = "Gabrielzkk";
  const comunidades = [];
  const pessoasFavoritas = ["peas", "filipedeschamps", "juunegreiros", "omariosouto", "douglasquintanilha"];


  return (

  <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={githubUser}/>
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Bem-vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fezer?</h2>
          <form onSubmit={function handleCriaComunidade(event) {
              event.preventDefault();
          }}>
            <div>
              <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li>
                  <a href={`https://www.github.com/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                  </a>
                </li>
                
              )
            })}
          </ul>

        </ProfileRelationsBoxWrapper>
      </div>  

    </MainGrid>
  </>
  )
}
