import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 1000;
  padding: 0.75rem 0;
  
  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 0 0.75rem;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  text-decoration: none;
  flex-shrink: 0;
  
  &:hover {
    color: #1d4ed8;
  }
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    font-size: 1.25rem;
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #1e40af;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
`;

const LogoTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LogoSubtitle = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  margin-top: -2px;
  
  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: #64748b;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #1e40af;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem 0.5rem 2rem;
    font-size: 0.8rem;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.75rem;
  color: #9ca3af;
  width: 1rem;
  height: 1rem;
  
  @media (max-width: 768px) {
    left: 0.5rem;
    width: 0.875rem;
    height: 0.875rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  color: #64748b;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoImage 
            src="/hamilton-logo.png" 
            alt="Alexander Hamilton Society Logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <LogoText>
            <LogoTitle>CMU AHS</LogoTitle>
            <LogoSubtitle>Internships & Careers</LogoSubtitle>
          </LogoText>
        </Logo>
        
        <Nav isOpen={isMenuOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">All Jobs</NavLink>
        </Nav>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </SearchContainer>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
