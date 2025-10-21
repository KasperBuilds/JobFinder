const Database = require('./database');

const realisticJobs = [
  {
    job_id: 'real_1',
    title: 'International Relations Officer',
    company: 'United Nations Development Programme',
    location: 'New York, NY',
    description: 'The United Nations Development Programme (UNDP) is seeking a qualified International Relations Officer to join our team. This position involves analyzing international political developments, preparing policy briefs, and supporting diplomatic initiatives.',
    requirements: 'Master\'s degree in International Relations, Political Science, or related field. Minimum 5 years of experience in international organizations. Fluency in English and at least one other UN language required.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 85000,
    salary_max: 110000,
    currency: 'USD',
    category: 'International Relations',
    job_url: 'https://jobs.undp.org/cj_view_job.cfm?cur_job_id=12345',
    company_url: 'https://www.undp.org',
    posted_date: new Date().toISOString(),
    experience_level: 'Senior',
    education_level: 'Master\'s',
    skills: 'International Relations, Policy Analysis, Diplomatic Skills, Research, Cross-cultural Communication',
    benefits: 'Health insurance, retirement plan, professional development, relocation assistance'
  },
  {
    job_id: 'real_2',
    title: 'Policy Research Analyst',
    company: 'Brookings Institution',
    location: 'Washington, DC',
    description: 'The Brookings Institution seeks a Policy Research Analyst to conduct in-depth research on domestic and international policy issues. This role involves analyzing policy proposals, writing comprehensive reports, and presenting findings to stakeholders.',
    requirements: 'PhD in Political Science, Economics, or related field preferred. Strong analytical and writing skills. Experience with policy research and data analysis. Knowledge of current policy debates.',
    employment_type: 'Full-time',
    remote_allowed: true,
    salary_min: 70000,
    salary_max: 95000,
    currency: 'USD',
    category: 'Political Science',
    job_url: 'https://www.brookings.edu/careers/policy-research-analyst',
    company_url: 'https://www.brookings.edu',
    posted_date: new Date(Date.now() - 86400000).toISOString(),
    experience_level: 'Mid-level',
    education_level: 'PhD',
    skills: 'Policy Research, Data Analysis, Writing, Public Speaking, Statistical Analysis',
    benefits: 'Health insurance, 401k, flexible work arrangements, research support'
  },
  {
    job_id: 'real_3',
    title: 'Human Rights Attorney',
    company: 'Amnesty International',
    location: 'London, UK',
    description: 'Join our legal team to fight for human rights around the world. This position involves legal research, advocacy, representing clients in human rights cases, and working on international legal frameworks.',
    requirements: 'Law degree and bar admission. 3+ years of experience in human rights law. Strong commitment to social justice. Experience with international human rights mechanisms.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 60000,
    salary_max: 80000,
    currency: 'GBP',
    category: 'Human Rights',
    job_url: 'https://www.amnesty.org/careers/human-rights-attorney',
    company_url: 'https://www.amnesty.org',
    posted_date: new Date(Date.now() - 172800000).toISOString(),
    experience_level: 'Mid-level',
    education_level: 'Bachelor\'s',
    skills: 'Human Rights Law, Legal Research, Advocacy, Client Representation, International Law',
    benefits: 'Health insurance, pension, professional development, sabbatical opportunities'
  },
  {
    job_id: 'real_4',
    title: 'International Development Manager',
    company: 'Oxfam International',
    location: 'Nairobi, Kenya',
    description: 'Lead international development projects in East Africa. This role involves managing development programs, coordinating with local partners, ensuring project deliverables, and advocating for policy change.',
    requirements: 'Master\'s degree in International Development, Public Policy, or related field. 5+ years of experience in development work. Experience working in developing countries. Strong project management skills.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 50000,
    salary_max: 70000,
    currency: 'USD',
    category: 'International Development',
    job_url: 'https://www.oxfam.org/careers/international-development-manager',
    company_url: 'https://www.oxfam.org',
    posted_date: new Date(Date.now() - 259200000).toISOString(),
    experience_level: 'Senior',
    education_level: 'Master\'s',
    skills: 'Project Management, International Development, Partnership Building, Program Evaluation, Advocacy',
    benefits: 'Health insurance, housing allowance, travel opportunities, professional development'
  },
  {
    job_id: 'real_5',
    title: 'Legal Counsel - International Law',
    company: 'International Criminal Court',
    location: 'The Hague, Netherlands',
    description: 'Provide legal counsel on international criminal law matters. This position involves legal research, case preparation, advising on international law issues, and supporting prosecutorial activities.',
    requirements: 'Law degree and admission to practice. 7+ years of experience in international law. Fluency in English and French. Experience with international criminal tribunals preferred.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 90000,
    salary_max: 120000,
    currency: 'EUR',
    category: 'International Law',
    job_url: 'https://www.icc-cpi.int/careers/legal-counsel',
    company_url: 'https://www.icc-cpi.int',
    posted_date: new Date(Date.now() - 345600000).toISOString(),
    experience_level: 'Senior',
    education_level: 'Bachelor\'s',
    skills: 'International Law, Legal Research, Case Preparation, Legal Writing, Criminal Law',
    benefits: 'Health insurance, pension, relocation assistance, diplomatic privileges'
  },
  {
    job_id: 'real_6',
    title: 'Public Policy Advisor',
    company: 'World Bank',
    location: 'Washington, DC',
    description: 'Advise on public policy issues related to economic development. This role involves policy analysis, stakeholder engagement, developing policy recommendations, and supporting country programs.',
    requirements: 'Master\'s degree in Public Policy, Economics, or related field. 4+ years of experience in policy analysis. Strong analytical and communication skills. Experience with multilateral institutions.',
    employment_type: 'Full-time',
    remote_allowed: true,
    salary_min: 80000,
    salary_max: 110000,
    currency: 'USD',
    category: 'Public Policy',
    job_url: 'https://www.worldbank.org/careers/public-policy-advisor',
    company_url: 'https://www.worldbank.org',
    posted_date: new Date(Date.now() - 432000000).toISOString(),
    experience_level: 'Mid-level',
    education_level: 'Master\'s',
    skills: 'Policy Analysis, Economic Development, Stakeholder Engagement, Research, Communication',
    benefits: 'Health insurance, 401k, professional development, flexible work, travel opportunities'
  },
  {
    job_id: 'real_7',
    title: 'Foreign Service Officer',
    company: 'US Department of State',
    location: 'Various Locations',
    description: 'Serve as a diplomatic officer representing the United States abroad. This position involves diplomatic relations, consular services, promoting US interests, and supporting foreign policy objectives.',
    requirements: 'Bachelor\'s degree required. Must pass Foreign Service Officer Test. Willingness to serve worldwide. Security clearance required. Foreign language skills preferred.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 65000,
    salary_max: 90000,
    currency: 'USD',
    category: 'Diplomacy',
    job_url: 'https://careers.state.gov/foreign-service-officer',
    company_url: 'https://www.state.gov',
    posted_date: new Date(Date.now() - 518400000).toISOString(),
    experience_level: 'Entry-level',
    education_level: 'Bachelor\'s',
    skills: 'Diplomacy, Foreign Languages, Cultural Sensitivity, Negotiation, Public Speaking',
    benefits: 'Health insurance, retirement, housing allowance, education benefits, diplomatic immunity'
  },
  {
    job_id: 'real_8',
    title: 'International Law Researcher',
    company: 'Harvard Law School',
    location: 'Cambridge, MA',
    description: 'Conduct research on international law topics. This position involves legal research, writing academic papers, contributing to international law scholarship, and supporting faculty research projects.',
    requirements: 'JD or PhD in Law. Strong research and writing skills. Experience in international law research. Academic background preferred.',
    employment_type: 'Full-time',
    remote_allowed: true,
    salary_min: 60000,
    salary_max: 85000,
    currency: 'USD',
    category: 'International Law',
    job_url: 'https://hr.harvard.edu/careers/international-law-researcher',
    company_url: 'https://hls.harvard.edu',
    posted_date: new Date(Date.now() - 604800000).toISOString(),
    experience_level: 'Mid-level',
    education_level: 'PhD',
    skills: 'Legal Research, Academic Writing, International Law, Scholarship, Analysis',
    benefits: 'Health insurance, retirement, research support, academic freedom, library access'
  },
  {
    job_id: 'real_9',
    title: 'Policy Analyst - International Affairs',
    company: 'Council on Foreign Relations',
    location: 'New York, NY',
    description: 'Analyze international affairs and foreign policy issues. This role involves researching global trends, writing policy briefs, organizing events, and contributing to CFR publications.',
    requirements: 'Master\'s degree in International Relations, Political Science, or related field. 3+ years of experience in policy analysis. Strong writing and analytical skills.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 75000,
    salary_max: 100000,
    currency: 'USD',
    category: 'International Relations',
    job_url: 'https://www.cfr.org/careers/policy-analyst',
    company_url: 'https://www.cfr.org',
    posted_date: new Date(Date.now() - 691200000).toISOString(),
    experience_level: 'Mid-level',
    education_level: 'Master\'s',
    skills: 'Policy Analysis, International Relations, Research, Writing, Event Management',
    benefits: 'Health insurance, 401k, professional development, networking opportunities'
  },
  {
    job_id: 'real_10',
    title: 'Legal Advisor - Human Rights',
    company: 'Human Rights Watch',
    location: 'New York, NY',
    description: 'Provide legal advice on human rights issues and support advocacy efforts. This position involves legal research, drafting reports, supporting litigation, and advising on international law.',
    requirements: 'Law degree and bar admission. 4+ years of experience in human rights law. Strong commitment to human rights. Experience with international legal mechanisms.',
    employment_type: 'Full-time',
    remote_allowed: false,
    salary_min: 70000,
    salary_max: 95000,
    currency: 'USD',
    category: 'Human Rights',
    job_url: 'https://www.hrw.org/careers/legal-advisor',
    company_url: 'https://www.hrw.org',
    posted_date: new Date(Date.now() - 777600000).toISOString(),
    experience_level: 'Mid-level',
    education_level: 'Bachelor\'s',
    skills: 'Human Rights Law, Legal Research, Advocacy, International Law, Report Writing',
    benefits: 'Health insurance, retirement, professional development, travel opportunities'
  }
];

async function insertRealisticData() {
  const db = new Database();
  
  try {
    console.log('Inserting realistic job data...');
    
    for (const job of realisticJobs) {
      await db.insertOrUpdateJob(job);
      console.log(`Inserted: ${job.title} at ${job.company}`);
    }
    
    console.log(`Successfully inserted ${realisticJobs.length} realistic jobs`);
    
    // Get total count
    const allJobs = await db.getJobs();
    console.log(`Total jobs in database: ${allJobs.length}`);
    
  } catch (error) {
    console.error('Error inserting realistic data:', error);
  } finally {
    db.close();
  }
}

if (require.main === module) {
  insertRealisticData();
}

module.exports = { insertRealisticData, realisticJobs };
