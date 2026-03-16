
export interface Country {
  name: string;
  code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  continent: 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
  flagUrl: string;
}

export const COUNTRIES: Country[] = [
  { name: "Argentina", code: "AR", capital: "Buenos Aires", region: "Americas", subregion: "South America", population: 45195777, continent: "Americas", flagUrl: "https://flagcdn.com/w320/ar.png" },
  { name: "Australia", code: "AU", capital: "Canberra", region: "Oceania", subregion: "Australia and New Zealand", population: 25499884, continent: "Oceania", flagUrl: "https://flagcdn.com/w320/au.png" },
  { name: "Brazil", code: "BR", capital: "Brasília", region: "Americas", subregion: "South America", population: 212559409, continent: "Americas", flagUrl: "https://flagcdn.com/w320/br.png" },
  { name: "Canada", code: "CA", capital: "Ottawa", region: "Americas", subregion: "North America", population: 38005238, continent: "Americas", flagUrl: "https://flagcdn.com/w320/ca.png" },
  { name: "China", code: "CN", capital: "Beijing", region: "Asia", subregion: "Eastern Asia", population: 1402112000, continent: "Asia", flagUrl: "https://flagcdn.com/w320/cn.png" },
  { name: "Egypt", code: "EG", capital: "Cairo", region: "Africa", subregion: "Northern Africa", population: 102334403, continent: "Africa", flagUrl: "https://flagcdn.com/w320/eg.png" },
  { name: "France", code: "FR", capital: "Paris", region: "Europe", subregion: "Western Europe", population: 67391582, continent: "Europe", flagUrl: "https://flagcdn.com/w320/fr.png" },
  { name: "Germany", code: "DE", capital: "Berlin", region: "Europe", subregion: "Western Europe", population: 83240525, continent: "Europe", flagUrl: "https://flagcdn.com/w320/de.png" },
  { name: "India", code: "IN", capital: "New Delhi", region: "Asia", subregion: "Southern Asia", population: 1380004385, continent: "Asia", flagUrl: "https://flagcdn.com/w320/in.png" },
  { name: "Italy", code: "IT", capital: "Rome", region: "Europe", subregion: "Southern Europe", population: 59554023, continent: "Europe", flagUrl: "https://flagcdn.com/w320/it.png" },
  { name: "Japan", code: "JP", capital: "Tokyo", region: "Asia", subregion: "Eastern Asia", population: 125836021, continent: "Asia", flagUrl: "https://flagcdn.com/w320/jp.png" },
  { name: "Kenya", code: "KE", capital: "Nairobi", region: "Africa", subregion: "Eastern Africa", population: 53771300, continent: "Africa", flagUrl: "https://flagcdn.com/w320/ke.png" },
  { name: "Mexico", code: "MX", capital: "Mexico City", region: "Americas", subregion: "North America", population: 128932753, continent: "Americas", flagUrl: "https://flagcdn.com/w320/mx.png" },
  { name: "Nigeria", code: "NG", capital: "Abuja", region: "Africa", subregion: "Western Africa", population: 206139587, continent: "Africa", flagUrl: "https://flagcdn.com/w320/ng.png" },
  { name: "Norway", code: "NO", capital: "Oslo", region: "Europe", subregion: "Northern Europe", population: 5379475, continent: "Europe", flagUrl: "https://flagcdn.com/w320/no.png" },
  { name: "South Africa", code: "ZA", capital: "Pretoria", region: "Africa", subregion: "Southern Africa", population: 59308690, continent: "Africa", flagUrl: "https://flagcdn.com/w320/za.png" },
  { name: "South Korea", code: "KR", capital: "Seoul", region: "Asia", subregion: "Eastern Asia", population: 51780579, continent: "Asia", flagUrl: "https://flagcdn.com/w320/kr.png" },
  { name: "Spain", code: "ES", capital: "Madrid", region: "Europe", subregion: "Southern Europe", population: 47351567, continent: "Europe", flagUrl: "https://flagcdn.com/w320/es.png" },
  { name: "Thailand", code: "TH", capital: "Bangkok", region: "Asia", subregion: "South-Eastern Asia", population: 69799978, continent: "Asia", flagUrl: "https://flagcdn.com/w320/th.png" },
  { name: "United Kingdom", code: "GB", capital: "London", region: "Europe", subregion: "Northern Europe", population: 67886011, continent: "Europe", flagUrl: "https://flagcdn.com/w320/gb.png" },
  { name: "United States", code: "US", capital: "Washington, D.C.", region: "Americas", subregion: "North America", population: 331002651, continent: "Americas", flagUrl: "https://flagcdn.com/w320/us.png" },
  { name: "Vietnam", code: "VN", capital: "Hanoi", region: "Asia", subregion: "South-Eastern Asia", population: 97338579, continent: "Asia", flagUrl: "https://flagcdn.com/w320/vn.png" }
];
