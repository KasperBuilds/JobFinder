import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBriefcase, FiGlobe, FiUsers, FiBookOpen } from 'react-icons/fi';
import { useJobs } from '../hooks/useJobs';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #1e40af;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CategoriesSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1e293b;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CategoryCard = styled(Link)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #1e40af;
  }
`;

const CategoryIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const CategoryDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const RecentJobsSection = styled.section`
  padding: 4rem 0;
  background: #f8fafc;
`;

const RecentJobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const JobCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #1e40af;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CompanyName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const JobLocation = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e40af;
  font-weight: 600;
  text-decoration: none;
  margin-top: 2rem;
  transition: color 0.2s;
  
  &:hover {
    color: #1d4ed8;
  }
`;

const categories = [
  {
    name: 'International Relations',
    description: 'Jobs in diplomacy, foreign affairs, international organizations',
    icon: FiGlobe,
    path: '/jobs?category=International Relations'
  },
  {
    name: 'Political Science',
    description: 'Research, analysis, and policy positions',
    icon: FiUsers,
    path: '/jobs?category=Political Science'
  },
  {
    name: 'Law',
    description: 'Legal positions, attorneys, legal counsel',
    icon: FiBookOpen,
    path: '/jobs?category=Law'
  },
  {
    name: 'Public Policy',
    description: 'Government policy, regulatory affairs',
    icon: FiBriefcase,
    path: '/jobs?category=Public Policy'
  },
  {
    name: 'Diplomacy',
    description: 'Diplomatic positions, embassy roles',
    icon: FiGlobe,
    path: '/jobs?category=Diplomacy'
  },
  {
    name: 'Human Rights',
    description: 'Advocacy, human rights organizations',
    icon: FiUsers,
    path: '/jobs?category=Human Rights'
  },
  {
    name: 'International Development',
    description: 'NGO positions, development work',
    icon: FiBriefcase,
    path: '/jobs?category=International Development'
  },
  {
    name: 'International Law',
    description: 'International legal positions',
    icon: FiBookOpen,
    path: '/jobs?category=International Law'
  }
];

function HomePage() {
  const { data: recentJobs, isLoading: jobsLoading } = useJobs({ limit: 6 });

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Find Your Dream Internship
          </HeroTitle>
          <HeroSubtitle>
            Discover internship and career opportunities in International Relations, Political Science, Law, 
            Public Policy, Diplomacy, Human Rights, International Development, and International Law
          </HeroSubtitle>
          <CTAButton to="/jobs">
            Browse All Jobs
            <FiArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <CategoriesSection>
        <div className="container">
          <SectionTitle>Job Categories</SectionTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.name} to={category.path}>
                <CategoryIcon>
                  <category.icon size={24} />
                </CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </div>
      </CategoriesSection>

      <RecentJobsSection>
        <div className="container">
          <SectionTitle>Recent Job Postings</SectionTitle>
          {jobsLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading recent jobs...
            </div>
          ) : (
            <>
              <RecentJobsGrid>
                {recentJobs?.jobs?.map((job) => (
                  <JobCard key={job.id}>
                    <JobTitle>{job.title}</JobTitle>
                    <CompanyName>{job.company}</CompanyName>
                    <JobLocation>{job.location}</JobLocation>
                  </JobCard>
                ))}
              </RecentJobsGrid>
              <div style={{ textAlign: 'center' }}>
                <ViewAllButton to="/jobs">
                  View All Jobs
                  <FiArrowRight />
                </ViewAllButton>
              </div>
            </>
          )}
        </div>
      </RecentJobsSection>
    </>
  );
}

export default HomePage;
