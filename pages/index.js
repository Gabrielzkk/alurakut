import React from "react";
import styled from "styled-components";
import MainGrid from '../src/componentes/MainGrid';
import Box from "../src/componentes/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/componentes/ProfileRelations"


function ProfileSideBar(props) {
  return (
    <Box as="aside">
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

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {props.title} ({props.items.length})
          </h2>
          <ul>
              {/* {seguidores.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://www.github.com/${itemAtual}.png`}>
                    <img src={itemAtual} />
                    <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })} */}
            </ul>
        </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const githubUser = "Gabrielzkk";
  const [comunidades, setComunidades] = React.useState([]);
  
  const pessoasFavoritas = ["peas", "filipedeschamps", "juunegreiros", "omariosouto", "douglasquintanilha"];

  const [seguidores, setSeguidores] = React.useState([])

    React.useEffect(function () {

      fetch("https://api.github.com/users/filipedeschamps/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })

    // API GraphQL
      fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Authorization": "1a409d044c21591915ad43d6c8636c",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ "query": `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }` })
      })
      .then((response) => response.json())
      .then((responseFull) => {
        const comunidadesDato = responseFull.data.allCommunities;

        console.log(comunidadesDato)
        setComunidades(comunidadesDato)
      })

    }, []);

    console.log("Seguidores antes do return: ", seguidores)

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
              const dadosDoForm = new FormData(event.target);

              console.log("Campo: ", dadosDoForm.get("title"));
              console.log("Campo: ", dadosDoForm.get("image"));
              
              const comunidade = {
                title: dadosDoForm.get("title"),
                imageUrl: dadosDoForm.get("image"),
                creatorSlug: githubUser,
              }

              fetch("/api/comunidades", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })

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
      
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.title}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`https://www.github.com/${itemAtual}`}>
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
