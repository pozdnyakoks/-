export type TVacancy = {
    title: string;
    date: string;
    company: string;
    location: string;
    status: string;
    tags: string[];
    salary: string;
}

export const vacancies = [
  {
    title: 'Smart Contract Developer',
    date: 'yesterday',
    company: 'All in Bits, Inc',
    location: 'Global Remote',
    // status: 'Closed',
    status: 'Still Open',
    tags: ['Software Engineer', 'Rust', 'Go'],
    salary: '$160K - $200K'
  },
  {
    title: 'Marketing Manager',
    date: '18 hrs ago',
    company: 'Zeta Chain',
    location: 'San Francisco, Remote',
    status: 'Still Open',
    tags: ['Marketing', 'Community Manager', ],
    salary: '$120K - $140K '
  },
  {
    title: 'Blockchain Developer',
    date: '3 hrs ago',
    company: 'Interchain Foundation',
    status: 'Still Open',
    location: 'Global Remote',
    tags: ['Software Engineer', 'Blockchain Developer', 'Go'],
    salary: '$180K - $210K'
  },
]