import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useJob } from '../hooks/useJobs';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #1e40af;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const JobContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const JobTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CompanyName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 1rem;
`;

const JobLocation = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Category = styled.div`
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const JobDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DetailSection = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1rem;
  }
`;

const Requirements = styled.div`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
  
  p {
    margin-bottom: 0.5rem;
  }
`;

const Skills = styled.div`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SalaryInfo = styled.div`
  color: #059669;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const EmploymentType = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const RemoteStatus = styled.div`
  color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background: #1e40af;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const PostedDate = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #64748b;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #dc2626;
`;

function JobDetailPage() {
  const { id } = useParams();
  const { data: job, isLoading, error } = useJob(id);

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingState>
          <div>Loading job details...</div>
        </LoadingState>
      </PageContainer>
    );
  }

  if (error || !job) {
    return (
      <PageContainer>
        <ErrorState>
          <div>Job not found or error loading job details.</div>
          <Link
            to="/jobs"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#1e40af',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem'
            }}
          >
            Back to Jobs
          </Link>
        </ErrorState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <BackButton to="/jobs">
            <FiArrowLeft />
            Back to Jobs
          </BackButton>
        </HeaderContent>
      </Header>

      <MainContent>
        <JobContent>
          <JobTitle>{job.title}</JobTitle>
          <CompanyName>{job.company}</CompanyName>
          <JobLocation>{job.location}</JobLocation>
          <Category>{job.category}</Category>
          
          <PostedDate>
            Posted: {new Date(job.posted_date).toLocaleDateString()}
          </PostedDate>
          
          <EmploymentType>
            Employment Type: {job.employment_type || 'Not specified'}
          </EmploymentType>
          
          {job.remote_allowed && (
            <RemoteStatus>✓ Remote work allowed</RemoteStatus>
          )}
          
          {job.salary_min && job.salary_max && (
            <SalaryInfo>
              Salary: {job.currency} {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
            </SalaryInfo>
          )}
          
          {job.description && (
            <Description>
              <SectionTitle>Job Description</SectionTitle>
              <div
                dangerouslySetInnerHTML={{ 
                  __html: job.description.replace(/\n/g, '<br>') 
                }}
              />
            </Description>
          )}
          
          <JobDetails>
            {job.requirements && (
              <DetailSection>
                <SectionTitle>Requirements</SectionTitle>
                <Requirements
                  dangerouslySetInnerHTML={{ 
                    __html: job.requirements.replace(/\n/g, '<br>') 
                  }}
                />
              </DetailSection>
            )}
            
            <DetailSection>
              <SectionTitle>Job Details</SectionTitle>
              {job.experience_level && (
                <div><strong>Experience Level:</strong> {job.experience_level}</div>
              )}
              {job.education_level && (
                <div><strong>Education Level:</strong> {job.education_level}</div>
              )}
              {job.skills && (
                <Skills>
                  <strong>Skills:</strong> {job.skills}
                </Skills>
              )}
              {job.benefits && (
                <div><strong>Benefits:</strong> {job.benefits}</div>
              )}
            </DetailSection>
          </JobDetails>
          
          {job.job_url && (
            <ApplyButton 
              href={job.job_url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Apply for this position →
            </ApplyButton>
          )}
        </JobContent>
      </MainContent>
    </PageContainer>
  );
}

export default JobDetailPage;
