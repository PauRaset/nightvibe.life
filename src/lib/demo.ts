// Datos de DEMOSTRACIÓN de la app, en un solo sitio. Tipos de local y zonas
// genéricos (regla de contenido: nada de locales reales). Cada cifra que sale en
// varias partes de la web es UNA variable de aquí: los 86 asistentes del evento
// son los mismos en el hero, la lista de esta noche, el universo y el cierre.
// Sustituir por datos reales cuando existan.

export type Venue = { kind: string; zone: string; opens: string; attendees: number };

/** "Ahora mismo": locales de esta noche, ordenados por asistentes confirmados. */
export const tonight: Venue[] = [
  { kind: "Club techno", zone: "Zona puerto", opens: "23:59", attendees: 86 },
  { kind: "Club de reguetón", zone: "Zona de ocio", opens: "00:30", attendees: 57 },
  { kind: "Sala de conciertos", zone: "Casco antiguo", opens: "22:30", attendees: 41 },
  { kind: "Bar musical", zone: "Paseo marítimo", opens: "23:00", attendees: 23 },
  { kind: "Club de house", zone: "Zona norte", opens: "00:00", attendees: 12 },
  { kind: "Bar de copas", zone: "Plaza mayor", opens: "22:00", attendees: 6 },
  { kind: "Terraza", zone: "Zona playa", opens: "23:30", attendees: 3 },
  { kind: "Sala indie", zone: "Barrio viejo", opens: "01:00", attendees: 0 },
];

/** El evento protagonista: el primero de la lista. */
export const featured = {
  ...tonight[0],
  date: "Sáb 24 oct",
  hours: "23:59 – 06:00",
  age: "18+",
  genre: "Techno",
};

/** Personas que sigues y van al evento: inicial y tono propio (identidad, no datos). */
export const friends = [
  { name: "Laura", hue: "cyan" },
  { name: "Jordi", hue: "violet" },
  { name: "Núria", hue: "magenta" },
  { name: "Biel", hue: "cyan" },
  { name: "Aina", hue: "violet" },
  { name: "Clara", hue: "magenta" },
] as const;

/** Perfiles privados entre los asistentes: van, pero sin identidad. */
export const privateAttendees = 17;

/** Los 10 niveles de un local. EJEMPLO: cada local define los suyos. */
export const levels = [
  "Chupito de bienvenida",
  "Sin cola una noche",
  "Chupito para ti y un amigo",
  "Entrada gratis",
  "Copa gratis",
  "Sin cola + chupito",
  "Entrada gratis + copa",
  "Botella de cava",
  "Copa + sin cola toda la temporada",
  "Mesa con botella",
].map((reward, i) => ({ level: i + 1, reward }));

/** El nivel en curso del usuario en el evento protagonista. */
export const progress = {
  level: 3,
  missions: [
    { title: "Escanea el QR del local", done: true },
    { title: "Sube una foto de la noche", done: true },
    { title: "Escanea el QR otra noche", done: false },
  ],
};

export const ticket = { serial: "NV-DEMO-0000", payload: "NIGHTVIBE · ENTRADA DE DEMOSTRACIÓN" };

/** Panel del local esta noche (para /locales). Entradas vendidas ≤ confirmados. */
export const venuePanel = {
  confirmed: featured.attendees,
  ticketsSold: 64,
  checkedIn: 0,
  activeMissions: progress.missions.length,
};

// Comprobaciones: lo que se repite tiene que cuadrar.
console.assert(
  tonight.every((v, i) => i === 0 || tonight[i - 1].attendees >= v.attendees),
  "tonight debe ir ordenado por asistentes",
);
console.assert(friends.length + privateAttendees < featured.attendees, "amigos + privados < asistentes");
console.assert(levels.length === 10 && levels[9].reward === "Mesa con botella", "10 niveles, mesa en el 10");
console.assert(venuePanel.ticketsSold <= venuePanel.confirmed, "vendidas ≤ confirmados");
