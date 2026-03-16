
export interface State {
  name: string;
  flagUrl: string;
  history: string;
}

export interface Country {
  name: string;
  code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  continent: 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
  flagUrl: string;
  history: string;
  statesCount: number;
  lgasCount: number;
  states?: State[];
}

export const COUNTRIES: Country[] = [
  { 
    name: "Argentina", 
    code: "AR", 
    capital: "Buenos Aires", 
    region: "Americas", 
    subregion: "South America", 
    population: 45195777, 
    continent: "Americas", 
    flagUrl: "https://flagcdn.com/w320/ar.png",
    statesCount: 24,
    lgasCount: 527,
    history: "Argentina's history dates back to indigenous civilizations before Spanish colonization began in the 16th century. It declared independence from Spain in 1816 following the May Revolution of 10. The nation went through periods of internal conflict before emerging as a major agricultural power in the late 19th and early 20th centuries.",
    states: [
      { name: "Buenos Aires", flagUrl: "https://flagcdn.com/w320/ar-b.png", history: "The most populous province, it was the site of the first Spanish settlement in the region." },
      { name: "Córdoba", flagUrl: "https://flagcdn.com/w320/ar-x.png", history: "Known for its colonial architecture and being a center of education since the 17th century." }
    ]
  },
  { 
    name: "Australia", 
    code: "AU", 
    capital: "Canberra", 
    region: "Oceania", 
    subregion: "Australia and New Zealand", 
    population: 25499884, 
    continent: "Oceania", 
    flagUrl: "https://flagcdn.com/w320/au.png",
    statesCount: 8,
    lgasCount: 537,
    history: "Inhabited by Aboriginal and Torres Strait Islander peoples for over 65,000 years, Australia saw British colonization beginning in 1788. The six colonies federated in 1901 to form the Commonwealth of Australia.",
    states: [
      { name: "New South Wales", flagUrl: "https://flagcdn.com/w320/au-nsw.png", history: "The first colony established by the British in 1788 as a penal settlement." },
      { name: "Victoria", flagUrl: "https://flagcdn.com/w320/au-vic.png", history: "Separated from New South Wales in 1851 following the discovery of gold." }
    ]
  },
  { 
    name: "Brazil", 
    code: "BR", 
    capital: "Brasília", 
    region: "Americas", 
    subregion: "South America", 
    population: 212559409, 
    continent: "Americas", 
    flagUrl: "https://flagcdn.com/w320/br.png",
    statesCount: 27,
    lgasCount: 5570,
    history: "Originally inhabited by diverse indigenous groups, Brazil became a Portuguese colony in 1500. It declared independence in 1822 and became a republic in 1889.",
    states: [
      { name: "São Paulo", flagUrl: "https://flagcdn.com/w320/br-sp.png", history: "Developed from a small Jesuit mission into the economic powerhouse of South America." },
      { name: "Rio de Janeiro", flagUrl: "https://flagcdn.com/w320/br-rj.png", history: "Served as the capital of the Portuguese Empire and later the Brazilian Empire." }
    ]
  },
  { 
    name: "Canada", 
    code: "CA", 
    capital: "Ottawa", 
    region: "Americas", 
    subregion: "North America", 
    population: 38005238, 
    continent: "Americas", 
    flagUrl: "https://flagcdn.com/w320/ca.png",
    statesCount: 13,
    lgasCount: 3500,
    history: "Canada evolved from French and British colonies. The British North America Act of 1867 united the colonies into a single dominion.",
    states: [
      { name: "Ontario", flagUrl: "https://flagcdn.com/w320/ca-on.png", history: "One of the original four provinces to join Confederation in 1867." },
      { name: "Quebec", flagUrl: "https://flagcdn.com/w320/ca-qc.png", history: "The center of French culture in North America, with a history dating back to New France." }
    ]
  },
  { 
    name: "Nigeria", 
    code: "NG", 
    capital: "Abuja", 
    region: "Africa", 
    subregion: "Western Africa", 
    population: 206139587, 
    continent: "Africa", 
    flagUrl: "https://flagcdn.com/w320/ng.png",
    statesCount: 37,
    lgasCount: 774,
    history: "Nigeria is home to ancient civilizations like the Nok and the Benin Empire. Nigeria gained independence in 1960 and is now Africa's most populous nation.",
    states: [
      { name: "Lagos", flagUrl: "https://picsum.photos/seed/lagos/320/200", history: "Originally a Yoruba settlement, it became a major colonial port and later the first capital of independent Nigeria." },
      { name: "Kano", flagUrl: "https://picsum.photos/seed/kano/320/200", history: "One of the oldest cities in Africa, it was the center of a powerful trans-Saharan trade empire." },
      { name: "Rivers", flagUrl: "https://picsum.photos/seed/rivers/320/200", history: "Part of the Oil Rivers Protectorate, it became a major hub for the global oil industry." },
      { name: "Oyo", flagUrl: "https://picsum.photos/seed/oyo/320/200", history: "The heart of the historic Oyo Empire, one of the most politically sophisticated states in pre-colonial Africa." }
    ]
  },
  { 
    name: "United States", 
    code: "US", 
    capital: "Washington, D.C.", 
    region: "Americas", 
    subregion: "North America", 
    population: 331002651, 
    continent: "Americas", 
    flagUrl: "https://flagcdn.com/w320/us.png",
    statesCount: 51,
    lgasCount: 3143,
    history: "Formed from thirteen British colonies that declared independence in 1776, the US expanded across the North American continent.",
    states: [
      { name: "California", flagUrl: "https://flagcdn.com/w320/us-ca.png", history: "Became the 31st state in 1850 following the Mexican-American War and the Gold Rush." },
      { name: "Texas", flagUrl: "https://flagcdn.com/w320/us-tx.png", history: "Briefly an independent republic before joining the United States in 1845." },
      { name: "New York", flagUrl: "https://flagcdn.com/w320/us-ny.png", history: "Originally the Dutch colony of New Netherland, it was renamed after the British takeover in 1664." }
    ]
  },
  { 
    name: "China", 
    code: "CN", 
    capital: "Beijing", 
    region: "Asia", 
    subregion: "Eastern Asia", 
    population: 1402112000, 
    continent: "Asia", 
    flagUrl: "https://flagcdn.com/w320/cn.png",
    statesCount: 34,
    lgasCount: 2851,
    history: "One of the world's oldest civilizations, China was ruled by successive dynasties for millennia. The People's Republic of China was founded in 1949."
  },
  { 
    name: "Egypt", 
    code: "EG", 
    capital: "Cairo", 
    region: "Africa", 
    subregion: "Northern Africa", 
    population: 102334403, 
    continent: "Africa", 
    flagUrl: "https://flagcdn.com/w320/eg.png",
    statesCount: 27,
    lgasCount: 271,
    history: "Famous for its ancient civilization, Egypt has a history spanning over five millennia. Egypt gained independence in 1922."
  },
  { 
    name: "France", 
    code: "FR", 
    capital: "Paris", 
    region: "Europe", 
    subregion: "Western Europe", 
    population: 67391582, 
    continent: "Europe", 
    flagUrl: "https://flagcdn.com/w320/fr.png",
    statesCount: 18,
    lgasCount: 34945,
    history: "Emerging from the Roman province of Gaul, France has been a global leader in culture and politics since the 1789 Revolution."
  },
  { 
    name: "Germany", 
    code: "DE", 
    capital: "Berlin", 
    region: "Europe", 
    subregion: "Western Europe", 
    population: 83240525, 
    continent: "Europe", 
    flagUrl: "https://flagcdn.com/w320/de.png",
    statesCount: 16,
    lgasCount: 11000,
    history: "First unified as a nation-state in 1871. After division during the Cold War, the nation was reunified in 1990."
  },
  { 
    name: "India", 
    code: "IN", 
    capital: "New Delhi", 
    region: "Asia", 
    subregion: "Southern Asia", 
    population: 1380004385, 
    continent: "Asia", 
    flagUrl: "https://flagcdn.com/w320/in.png",
    statesCount: 36,
    lgasCount: 766,
    history: "Home to the Indus Valley Civilization. A massive non-violent independence movement resulted in freedom in 1947."
  },
  { 
    name: "Italy", 
    code: "IT", 
    capital: "Rome", 
    region: "Europe", 
    subregion: "Southern Europe", 
    population: 59554023, 
    continent: "Europe", 
    flagUrl: "https://flagcdn.com/w320/it.png",
    statesCount: 20,
    lgasCount: 7904,
    history: "Central to Western history, Italy was the heart of the Roman Empire and the Renaissance. It became a republic in 1946."
  }
];
