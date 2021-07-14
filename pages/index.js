import styled from "styled-components";
import MainGrid from '../src/componentes/MainGrid';
import Box from "../src/componentes/Box";



function ProfileSideBar(props) {
  console.log(props);
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }}/>
    </Box>
  )
}

export default function Home() {

  const githubUser = "Gabrielzkk";


  return (

  <MainGrid>
    <div className="profileArea" style={{ gridArea: 'profileArea'}}>
      <ProfileSideBar githubUser={githubUser}/>
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
