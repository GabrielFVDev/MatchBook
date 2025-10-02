
import { PageWrapper } from "../../components/PageWrapper";
import Header from "../../components/Header";
import { Title } from "../../components/Title";
import { 
    ProfileContainer, 
    ProfileCard, 
    ProfileHeader, 
    ProfileAvatar, 
    ProfileInfo, 
    InfoRow, 
    InfoLabel, 
    InfoValue, 
    StatsContainer, 
    StatBox 
} from "./styles.module.jsx";

// Mock de dados do usuário - substitua com dados reais da API
const user = {
    nome: "Gabriel",
    email: "gabriel@example.com",
    data_nascimento: "1990-01-01",
    genero_favorito: "Ficção Científica",
    livros_lidos: 42,
    autor_preferido: "Isaac Asimov",
    nivel_leitura: "Avançado",
    receber_recomendacoes: true,
    data_cadastro: "2023-10-26",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
};

export default function ProfilePage() {
    return (
        <PageWrapper>
            <Header />
            <ProfileContainer>
                <Title>Perfil do Leitor</Title>
                <ProfileCard>
                    <ProfileHeader>
                        <ProfileAvatar src={user.avatarUrl} alt="Avatar do usuário" />
                        <ProfileInfo>
                            <h2>{user.nome}</h2>
                            <p>{user.email}</p>
                        </ProfileInfo>
                    </ProfileHeader>

                    <InfoRow>
                        <InfoLabel>Data de Nascimento:</InfoLabel>
                        <InfoValue>{user.data_nascimento}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Gênero Favorito:</InfoLabel>
                        <InfoValue>{user.genero_favorito}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Autor Preferido:</InfoLabel>
                        <InfoValue>{user.autor_preferido}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Nível de Leitura:</InfoLabel>
                        <InfoValue>{user.nivel_leitura}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Receber Recomendações:</InfoLabel>
                        <InfoValue>{user.receber_recomendacoes ? "Sim" : "Não"}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>Membro desde:</InfoLabel>
                        <InfoValue>{user.data_cadastro}</InfoValue>
                    </InfoRow>

                    <StatsContainer>
                        <StatBox>
                            <h3>{user.livros_lidos}</h3>
                            <p>Livros Lidos</p>
                        </StatBox>
                        {/* Adicione mais estatísticas aqui, como livros aceitos/recusados */}
                    </StatsContainer>
                </ProfileCard>
            </ProfileContainer>
        </PageWrapper>
    );
}
