import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiRefreshCw } from 'react-icons/fi';
import { useJobs } from '../hooks/useJobs';
import { useStats, useFilterOptions } from '../hooks/useStats';
import JobCard from '../components/JobCard';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 2rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const SearchSection = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
`;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? '#1e40af' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#1d4ed8' : '#f8fafc'};
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc2626;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const StatsBar = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatsText = styled.div`
  color: #64748b;
  font-size: 0.875rem;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s;
  
  &:hover {
    background: #1d4ed8;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

function JobListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get current filters from URL
  const currentFilters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    employment_type: searchParams.get('employment_type') || '',
    remote_only: searchParams.get('remote_only') === 'true',
    salary_min: searchParams.get('salary_min') || '',
    page: parseInt(searchParams.get('page')) || 1,
    limit: 20
  };

  const { data: jobsData, isLoading, error, refetch } = useJobs(currentFilters);
  const { data: filterOptions } = useFilterOptions();
  const { data: stats } = useStats();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');
    
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }
    newParams.delete('page'); // Reset to first page
    setSearchParams(newParams);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const totalJobs = jobsData?.pagination?.total || 0;

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <PageTitle>Job Listings</PageTitle>
          <PageSubtitle>
            Find your next opportunity in international affairs, law, and policy
          </PageSubtitle>
        </HeaderContent>
      </Header>

      <SearchSection>
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: '1rem' }}>
            <SearchInput
              name="search"
              placeholder="Search jobs, companies, or keywords..."
              defaultValue={currentFilters.search}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: '#1e40af',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <FiSearch />
            </button>
          </form>
        </SearchContainer>
      </SearchSection>

      <MainContent>
        <StatsBar>
          <StatsText>
            {isLoading ? 'Loading...' : `${totalJobs} jobs found`}
          </StatsText>
          <RefreshButton
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </RefreshButton>
        </StatsBar>

        {isLoading && (
          <LoadingState>
            <FiRefreshCw className="animate-spin" style={{ marginBottom: '1rem' }} />
            <div>Loading jobs...</div>
          </LoadingState>
        )}

        {error && (
          <ErrorState>
            <div>Error loading jobs. Please try again.</div>
            <button
              onClick={handleRefresh}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#1e40af',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </ErrorState>
        )}

        {!isLoading && !error && jobsData?.jobs?.length === 0 && (
          <EmptyState>
            <div>No jobs found matching your criteria.</div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Try adjusting your search terms.
            </div>
          </EmptyState>
        )}

        {!isLoading && !error && jobsData?.jobs?.length > 0 && (
          <JobsGrid>
            {jobsData.jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </JobsGrid>
        )}
      </MainContent>
    </PageContainer>
  );
}

export default JobListPage;
