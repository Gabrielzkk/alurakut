import styled from "styled-components";
import MainGrid from '../src/componentes/MainGrid';
import Box from "../src/componentes/Box";

export default function Home() {

  const githubUser = "Gabrielzkk";
  

  return (

  <MainGrid>
    <div className="profileArea" style={{ gridArea: 'profileArea'}}>
      <Box>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: "8px" }}/>
      </Box>
    </div>

    <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
      <Box>
        Bem-vindo
      </Box>
    </div>

    <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
      <Box>
        Amigos
      </Box>
      <Box>
        Pessoas da Comunidade
      </Box>
    </div>  

  </MainGrid>

  )
}
