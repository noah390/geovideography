
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
    history: "Argentina's history dates back to indigenous civilizations before Spanish colonization began in the 16th century. It declared independence from Spain in 1816 following the May Revolution of 1810. The nation went through periods of internal conflict before emerging as a major agricultural power in the late 19th and early 20th centuries."
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
    history: "Inhabited by Aboriginal and Torres Strait Islander peoples for over 65,000 years, Australia saw British colonization beginning in 1788 with the arrival of the First Fleet. The six colonies federated in 1901 to form the Commonwealth of Australia, maintaining close ties with the British monarchy while developing a distinct national identity."
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
    history: "Originally inhabited by diverse indigenous groups, Brazil became a Portuguese colony in 1500. It served as the seat of the Portuguese Empire in the early 19th century before declaring independence in 1822 as the Empire of Brazil. It became a republic in 1889 after a military coup."
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
    history: "Canada evolved from French and British colonies. Following the British victory in the Seven Years' War, the territory came under British rule. The British North America Act of 1867 united the colonies into a single dominion, which gradually achieved full sovereignty through the 20th century."
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
    history: "One of the world's oldest civilizations, China was ruled by successive dynasties for millennia. The Xinhai Revolution in 1911 ended imperial rule and established the Republic of China. Following a civil war, the People's Republic of China was founded in 1949 under the Communist Party."
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
    history: "Famous for its ancient civilization, Egypt has a history spanning over five millennia. After centuries of rule by various empires including the Persians, Greeks, Romans, and Arabs, it became a British protectorate in 1882. Egypt gained independence in 1922 and became a republic in 1953."
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
    history: "Emerging from the Roman province of Gaul, the Kingdom of France was established in the early Middle Ages. The French Revolution of 1789 fundamentally transformed the nation, ending the absolute monarchy and establishing the first republic. France has since been a global leader in culture, politics, and science."
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
    history: "For much of its history, Germany was a collection of sovereign states. It was first unified as a nation-state in 1871 under the Prussian-led German Empire. After the world wars and a period of division into East and West Germany during the Cold War, the nation was reunified in 1990."
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
    history: "Home to the Indus Valley Civilization, India saw the rise of powerful empires like the Maurya and Mughal. It came under British East India Company rule in the 18th century, followed by the British Raj. A massive non-violent independence movement led by Mahatma Gandhi resulted in freedom in 1947."
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
    history: "Central to Western history, Italy was the heart of the Roman Empire and the Renaissance. After the fall of Rome, it remained divided until the Risorgimento movement of the 19th century led to unification and the establishment of the Kingdom of Italy in 1861. It became a republic in 1946."
  },
  { 
    name: "Japan", 
    code: "JP", 
    capital: "Tokyo", 
    region: "Asia", 
    subregion: "Eastern Asia", 
    population: 125836021, 
    continent: "Asia", 
    flagUrl: "https://flagcdn.com/w320/jp.png",
    statesCount: 47,
    lgasCount: 1718,
    history: "Japan transitioned from early indigenous cultures through periods of feudal rule by Shoguns and Samurai. The Meiji Restoration in 1868 returned power to the Emperor and initiated rapid modernization. Post-WWII, Japan adopted a pacifist constitution and emerged as a global economic leader."
  },
  { 
    name: "Kenya", 
    code: "KE", 
    capital: "Nairobi", 
    region: "Africa", 
    subregion: "Eastern Africa", 
    population: 53771300, 
    continent: "Africa", 
    flagUrl: "https://flagcdn.com/w320/ke.png",
    statesCount: 47,
    lgasCount: 290,
    history: "Kenya has a long history of human settlement dating back to the Stone Age. It became a British protectorate in 1895 and a colony in 1920. Following the Mau Mau uprising against colonial rule, Kenya gained independence in 1963 with Jomo Kenyatta as its first president."
  },
  { 
    name: "Mexico", 
    code: "MX", 
    capital: "Mexico City", 
    region: "Americas", 
    subregion: "North America", 
    population: 128932753, 
    continent: "Americas", 
    flagUrl: "https://flagcdn.com/w320/mx.png",
    statesCount: 32,
    lgasCount: 2469,
    history: "Home to the Maya and Aztec civilizations, Mexico was conquered by Spain in 1521. After three centuries of colonial rule, Mexico gained independence in 1821. The nation's history since then has included a revolution in 1910 that led to the current political structure."
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
    history: "Nigeria is home to ancient civilizations like the Nok and the Benin Empire. British colonial influence grew in the 19th century, leading to the amalgamation of Northern and Southern protectorates in 1914. Nigeria gained independence in 1960 and is now Africa's most populous nation."
  },
  { 
    name: "Norway", 
    code: "NO", 
    capital: "Oslo", 
    region: "Europe", 
    subregion: "Northern Europe", 
    population: 5379475, 
    continent: "Europe", 
    flagUrl: "https://flagcdn.com/w320/no.png",
    statesCount: 15,
    lgasCount: 356,
    history: "Famous for the Viking Age, Norway was unified into a kingdom in the 9th century. It entered unions with Denmark and later Sweden before achieving full independence in 1905. Since the discovery of offshore oil in the 1960s, it has become one of the world's most prosperous nations."
  },
  { 
    name: "South Africa", 
    code: "ZA", 
    capital: "Pretoria", 
    region: "Africa", 
    subregion: "Southern Africa", 
    population: 59308690, 
    continent: "Africa", 
    flagUrl: "https://flagcdn.com/w320/za.png",
    statesCount: 9,
    lgasCount: 257,
    history: "South Africa's history is marked by early settlement, colonization by the Dutch and British, and the institutionalized racial segregation known as Apartheid. After decades of struggle, the nation transitioned to a multiracial democracy in 1994, with Nelson Mandela as its first black president."
  },
  { 
    name: "South Korea", 
    code: "KR", 
    capital: "Seoul", 
    region: "Asia", 
    subregion: "Eastern Asia", 
    population: 51780579, 
    continent: "Asia", 
    flagUrl: "https://flagcdn.com/w320/kr.png",
    statesCount: 17,
    lgasCount: 226,
    history: "Korea has a rich history of dynastic rule including the Goryeo and Joseon periods. It was annexed by Japan in 1910. Following WWII, the peninsula was divided. South Korea emerged from the Korean War to become one of the world's leading industrial and technological democracies."
  },
  { 
    name: "Spain", 
    code: "ES", 
    capital: "Madrid", 
    region: "Europe", 
    subregion: "Southern Europe", 
    population: 47351567, 
    continent: "Europe", 
    flagUrl: "https://flagcdn.com/w320/es.png",
    statesCount: 19,
    lgasCount: 8131,
    history: "Following the Reconquista and the unification of the crowns of Castile and Aragon in 1492, Spain built a vast global empire. After periods of decline and a civil war in the 20th century, Spain transitioned to a constitutional monarchy and democracy in the late 1970s."
  },
  { 
    name: "Thailand", 
    code: "TH", 
    capital: "Bangkok", 
    region: "Asia", 
    subregion: "South-Eastern Asia", 
    population: 69799978, 
    continent: "Asia", 
    flagUrl: "https://flagcdn.com/w320/th.png",
    statesCount: 77,
    lgasCount: 878,
    history: "Known for centuries as Siam, Thailand is the only Southeast Asian nation never colonized by a European power. It transitioned from an absolute monarchy to a constitutional monarchy in 1932. It is renowned for its cultural heritage and successful modernization."
  },
  { 
    name: "United Kingdom", 
    code: "GB", 
    capital: "London", 
    region: "Europe", 
    subregion: "Northern Europe", 
    population: 67886011, 
    continent: "Europe", 
    flagUrl: "https://flagcdn.com/w320/gb.png",
    statesCount: 4,
    lgasCount: 317,
    history: "Formed through the union of England, Scotland, and Wales (and later Ireland), the UK was the world's foremost industrial and maritime power during the 19th century. Although it oversaw a vast empire, it now focuses on its role as a global financial and cultural center."
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
    history: "Formed from thirteen British colonies that declared independence in 1776, the US expanded across the North American continent. After a civil war in the 1860s, it emerged as a leading industrial power and, following the world wars, a global superpower."
  },
  { 
    name: "Vietnam", 
    code: "VN", 
    capital: "Hanoi", 
    region: "Asia", 
    subregion: "South-Eastern Asia", 
    population: 97338579, 
    continent: "Asia", 
    flagUrl: "https://flagcdn.com/w320/vn.png",
    statesCount: 63,
    lgasCount: 705,
    history: "Vietnam's history is characterized by resistance to foreign rule, including a thousand years of Chinese influence and later French colonization. After a long conflict for independence and unification in the 20th century, Vietnam has achieved rapid economic growth."
  }
];
