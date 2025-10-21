import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiGlobe, FiUsers, FiBookOpen, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const CategoryCard = styled(Link)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #1e40af;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1e40af, #3b82f6);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CategoryIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const CategoryDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ViewJobsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1e40af;
  font-weight: 600;
  font-size: 0.875rem;
  transition: color 0.2s;
  
  ${CategoryCard}:hover & {
    color: #1d4ed8;
  }
`;

const categories = [
  {
    name: 'International Relations',
    description: 'Explore careers in diplomacy, foreign affairs, and international organizations. Work on global issues, international cooperation, and cross-cultural relations.',
    icon: FiGlobe,
    path: '/jobs?category=International Relations'
  },
  {
    name: 'Political Science',
    description: 'Find research, analysis, and policy positions in government, think tanks, and academic institutions. Shape public policy and political discourse.',
    icon: FiUsers,
    path: '/jobs?category=Political Science'
  },
  {
    name: 'Law',
    description: 'Discover legal positions including attorneys, legal counsel, and legal advisors. Work in various sectors from corporate to public interest law.',
    icon: FiBookOpen,
    path: '/jobs?category=Law'
  },
  {
    name: 'Public Policy',
    description: 'Engage in government policy, regulatory affairs, and public administration. Help shape policies that impact society and governance.',
    icon: FiBriefcase,
    path: '/jobs?category=Public Policy'
  },
  {
    name: 'Diplomacy',
    description: 'Pursue diplomatic positions, embassy roles, and consular services. Represent your country and build international relationships.',
    icon: FiGlobe,
    path: '/jobs?category=Diplomacy'
  },
  {
    name: 'Human Rights',
    description: 'Advocate for human rights, work with NGOs, and promote social justice. Make a difference in protecting and advancing human dignity.',
    icon: FiUsers,
    path: '/jobs?category=Human Rights'
  },
  {
    name: 'International Development',
    description: 'Join development work, NGO positions, and international aid organizations. Help improve lives and communities worldwide.',
    icon: FiBriefcase,
    path: '/jobs?category=International Development'
  },
  {
    name: 'International Law',
    description: 'Specialize in international legal positions, treaty law, and international courts. Work on global legal frameworks and international justice.',
    icon: FiBookOpen,
    path: '/jobs?category=International Law'
  }
];

function CategoriesPage() {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <PageTitle>Job Categories</PageTitle>
          <PageSubtitle>
            Explore opportunities across different fields in international affairs, 
            law, and policy. Find your perfect career path.
          </PageSubtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.name} to={category.path}>
              <CategoryHeader>
                <CategoryIcon>
                  <category.icon size={24} />
                </CategoryIcon>
                <div>
                  <CategoryName>{category.name}</CategoryName>
                </div>
              </CategoryHeader>

              <CategoryDescription>{category.description}</CategoryDescription>

              <ViewJobsButton>
                View Jobs
                <FiArrowRight />
              </ViewJobsButton>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </MainContent>
    </PageContainer>
  );
}

export default CategoriesPage;
