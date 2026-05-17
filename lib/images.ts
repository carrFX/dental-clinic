/**
 * Unsplash — URL dengan ixlib & auto=format agar stabil di next/image
 * https://unsplash.com/photos/...
 */
const u = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=80`;

export const images = {
  dentalHero: u("photo-1606811841689-23dfddce3e95", 1200, 900),
  /** Tim dokter / Dr. Sarah Wijaya */
  dentistTeam1: u("photo-1559839734-2b71ea197ec2", 800, 1000),
  dentistTeam2: u("photo-1612349317150-e413f6a5b16d", 800, 1000),
  dentistTeam3: u("photo-1594824476967-48c8b964273f", 800, 1000),
  /** Tim dokter Arcade Dental — section Tentang */
  aboutTeam: u("photo-1588776814546-1ffcf47267a5", 800, 800),
  dentalClinic: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=600&fit=crop&q=80",
} as const;
