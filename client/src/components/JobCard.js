import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi';

const Card = styled(Link)`
  display: block;
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e2e8f0;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    border-color: #3b82f6;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
  flex: 1;
`;

const Company = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const Category = styled.span`
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Description = styled.p`
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Salary = styled.div`
  color: #059669;
  font-weight: 600;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const RemoteBadge = styled.span`
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const ApplyLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 1rem;
`;

function JobCard({ job }) {
  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `${job.currency} ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`;
    }
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card to={`/jobs/${job.job_id}`}>
      <Header>
        <div style={{ flex: 1 }}>
          <Title>{job.title}</Title>
          <Company>{job.company}</Company>
        </div>
        <Category>{job.category}</Category>
      </Header>
      
      <Details>
        <DetailItem>
          <FiMapPin size={14} />
          {job.location}
        </DetailItem>
        <DetailItem>
          <FiClock size={14} />
          {formatDate(job.posted_date)}
        </DetailItem>
        {job.employment_type && (
          <DetailItem>
            {job.employment_type}
          </DetailItem>
        )}
      </Details>
      
      {job.description && (
        <Description>
          {job.description.replace(/<[^>]*>/g, '').substring(0, 200)}...
        </Description>
      )}
      
      {formatSalary() && (
        <Salary>{formatSalary()}</Salary>
      )}
      
      {job.remote_allowed && (
        <RemoteBadge>Remote</RemoteBadge>
      )}
      
      <ApplyLink>
        <FiExternalLink size={14} />
        View Details & Apply
      </ApplyLink>
    </Card>
  );
}

export default JobCard;
