import React from 'react';
import styled from 'styled-components';
import { FiTarget, FiUsers, FiGlobe, FiTrendingUp, FiClock, FiShield, FiBriefcase, FiHeart } from 'react-icons/fi';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionContent = styled.div`
  color: #374151;
  line-height: 1.8;
  font-size: 1.125rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            About AHS Job Portal
          </HeroTitle>
          <HeroSubtitle>
            Connecting talented professionals with meaningful careers in international affairs, 
            law, and policy
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionContent>
            We believe that the world needs dedicated professionals working in international 
            relations, law, public policy, and human rights. Our mission is to connect talented 
            individuals with meaningful career opportunities that make a real difference in the world.
          </SectionContent>
        </Section>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FiTarget size={24} />
            </FeatureIcon>
            <FeatureTitle>Focused Categories</FeatureTitle>
            <FeatureDescription>
              We specialize in 8 key areas: International Relations, Political Science, Law, 
              Public Policy, Diplomacy, Human Rights, International Development, and International Law.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiClock size={24} />
            </FeatureIcon>
            <FeatureTitle>Always Updated</FeatureTitle>
            <FeatureDescription>
              Our job listings are updated every 6 hours using advanced APIs, ensuring you 
              always see the latest opportunities.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiShield size={24} />
            </FeatureIcon>
            <FeatureTitle>Quality Assured</FeatureTitle>
            <FeatureDescription>
              Every job listing is carefully curated and verified to ensure authenticity 
              and relevance to our specialized fields.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiGlobe size={24} />
            </FeatureIcon>
            <FeatureTitle>Global Reach</FeatureTitle>
            <FeatureDescription>
              From local NGOs to international organizations, we feature opportunities 
              from around the world.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiTrendingUp size={24} />
            </FeatureIcon>
            <FeatureTitle>Advanced Filtering</FeatureTitle>
            <FeatureDescription>
              Find exactly what you're looking for with our powerful search and filter 
              capabilities.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiHeart size={24} />
            </FeatureIcon>
            <FeatureTitle>Mission-Driven</FeatureTitle>
            <FeatureDescription>
              We're passionate about connecting people with careers that make a positive 
              impact on society and the world.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </MainContent>
    </PageContainer>
  );
}

export default AboutPage;
