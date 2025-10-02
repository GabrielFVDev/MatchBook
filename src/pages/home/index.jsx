
import Header from "../../components/Header";
import {
  PageContainer,
  MainContent,
  BookDiscoveryCard,
  DiscoveryTitle,
  QuestionIcon,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
} from './styles.module.jsx';
import { FaQuestion } from 'react-icons/fa';

export default function HomePage() {
    return (
        <PageContainer>
            <Header />
            
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

