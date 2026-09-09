export interface ProductDetails {
  id: string;
  name: string;
  line: 'Essential Line' | 'Premium' | 'Hospitality';
  isAvailable: boolean;
}

export const products: ProductDetails[] = [
  // Essential Line
  { id: 'cali', name: 'Cali', line: 'Essential Line', isAvailable: true },
  { id: 'gretta', name: 'Gretta', line: 'Essential Line', isAvailable: true },
  { id: 'charleston', name: 'Charleston', line: 'Essential Line', isAvailable: true },
  { id: 'denmark', name: 'Denmark', line: 'Essential Line', isAvailable: true },
  { id: 'arizona', name: 'Arizona', line: 'Essential Line', isAvailable: true },
  { id: 'berlin', name: 'Berlin', line: 'Essential Line', isAvailable: true },

  // Premium Line
  { id: 'monterrey', name: 'Monterrey', line: 'Premium', isAvailable: true },
  { id: 'imperia', name: 'Imperia', line: 'Premium', isAvailable: true },
  { id: 'niza', name: 'Niza', line: 'Premium', isAvailable: true },
  { id: 'oporto', name: 'Oporto', line: 'Premium', isAvailable: true },
  { id: 'aspen', name: 'Aspen', line: 'Premium', isAvailable: true },
  { id: 'athena', name: 'Athena', line: 'Premium', isAvailable: true },
  { id: 'sorrento', name: 'Sorrento', line: 'Premium', isAvailable: true },
  { id: 'monaco', name: 'Monaco', line: 'Premium', isAvailable: true },
  { id: 'london', name: 'London', line: 'Premium', isAvailable: true },
  { id: 'trento', name: 'Trento', line: 'Premium', isAvailable: true },
  { id: 'salisbury', name: 'Salisbury', line: 'Premium', isAvailable: true },
  { id: 'royal', name: 'Royal', line: 'Premium', isAvailable: true },
  { id: 'newport', name: 'NewPort', line: 'Premium', isAvailable: true },
  { id: 'napoli', name: 'Napoli', line: 'Premium', isAvailable: true },
  { id: 'udine', name: 'Udine', line: 'Premium', isAvailable: true },

  // Hospitality Line
  { id: 'regent', name: 'Regent', line: 'Hospitality', isAvailable: true },
  { id: 'odette', name: 'Odette', line: 'Hospitality', isAvailable: true },
  { id: 'heaven', name: 'Heaven', line: 'Hospitality', isAvailable: true },
  { id: 'cardiff', name: 'Cardiff', line: 'Hospitality', isAvailable: true },
  { id: 'aubrey', name: 'Aubrey', line: 'Hospitality', isAvailable: true },
  { id: 'rio', name: 'Rio', line: 'Hospitality', isAvailable: true },
  { id: 'avenue', name: 'Avenue', line: 'Hospitality', isAvailable: true },
  { id: 'kensington', name: 'Kensington', line: 'Hospitality', isAvailable: true },
  { id: 'summit', name: 'Summit', line: 'Hospitality', isAvailable: true },
  { id: 'stilo', name: 'Stilo', line: 'Hospitality', isAvailable: true },
  { id: 'charlotte', name: 'Charlotte', line: 'Hospitality', isAvailable: true },
  { id: 'montana', name: 'Montana', line: 'Hospitality', isAvailable: true },
  { id: 'sacramento', name: 'Sacramento', line: 'Hospitality', isAvailable: true },
  { id: 'tebas', name: 'Tebas', line: 'Hospitality', isAvailable: true },
  { id: 'rome', name: 'Rome', line: 'Hospitality', isAvailable: true }
];
