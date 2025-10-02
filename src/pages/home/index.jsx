import {
  PageContainer,
  Header,
  Logo,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ProfileSection,
  ProfileButton,
  MainContent,
  BookDiscoveryCard,
  DiscoveryTitle,
  QuestionIcon,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
} from './styles.module.jsx';
import { FaSearch, FaUser, FaQuestion } from 'react-icons/fa';

export function HomePage() {
    return (
        <PageContainer>
            <Header>
                <Logo>MatchBook</Logo>
                <SearchContainer>
                    <SearchInput 
                        type="text" 
                        placeholder="Buscar livros, autores, gêneros..."
                    />
                    <SearchIcon>
                        <FaSearch />
                    </SearchIcon>
                </SearchContainer>
                <ProfileSection>
                    <ProfileButton>
                        <FaUser />
                    </ProfileButton>
                </ProfileSection>
            </Header>
            
            <MainContent>
                <BookDiscoveryCard>
                    <DiscoveryTitle>
                        Vamos descobrir seu próximo livro?
                    </DiscoveryTitle>
                    <QuestionIcon>
                        <FaQuestion />
                    </QuestionIcon>
                    <ActionButtons>
                        <PrimaryButton>Começar Quiz</PrimaryButton>
                        <SecondaryButton>Explorar Catálogo</SecondaryButton>
                    </ActionButtons>
                </BookDiscoveryCard>
            </MainContent>
        </PageContainer>
    );
}
