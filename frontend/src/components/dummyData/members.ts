export type Member = {
  id: string
  name: string
  email: string
  year: "Freshman" | "Sophomore" | "Junior" | "Senior+"
  grad: "2025" | "2026" | "2027" | "2028" | "2029" | "2030+"
  system: System[]
  subsystem: Subsystem[]
  joinDate: string
  hazing: "Completed" | "Uncompleted" 
  dues: "Paid" | "Unpaid"
  shirtSize: "XS" | "S" | "M" | "L" | "XL" | "XXL"
  other?: string
}

export const subsystemCategories = {
  Powertrain: ["Electronics", "Battery", "Low Voltage", "Tractive System"],
  Software: ["Embedded", "App Dev", "Daq"],
  Chassis: ["Frame", "Aero", "Ergo", "Brakes", "Suspension", "Drivetrain"],
  Business: ["Financial", "General Business", "Public Relations"],
} as const;

export type System = keyof typeof subsystemCategories;
export type Subsystem = typeof subsystemCategories[System][number];

export const data: Member[] = [
  {
    id: "m5gr84i9",
    year: "Senior+",
    name: "John Smith",
    grad: "2030+",
    system: ["Powertrain"],
    email: "ken99@example.com",
    subsystem: ["Battery"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Unpaid",
    shirtSize: "XXL",
  },
  {
    id: "3u1reuv4",
    year: "Sophomore",
    name: "CarMella McCarface",
    grad: "2026",
    system: ["Powertrain"],
    email: "Abe45@example.com",
    subsystem: ["Low Voltage"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "derv1ws0",
    year: "Junior",
    name: "Ricky Liang",
    grad: "2026",
    system: ["Software"],
    email: "Monserrat44@example.com",
    subsystem: ["Daq"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "5kma53ae",
    year: "Freshman",
    name: "Anna Johnson",
    grad: "2027",
    system: ["Chassis"],
    email: "Silas22@example.com",
    subsystem: ["Ergo"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "bhqecj4p",
    year: "Senior+",
    name: "Harry Potter",
    grad: "2030+",
    system: ["Software"],
    email: "carmella@example.com",
    subsystem: ["Embedded"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "hiug867n",
    year: "Freshman",
    name: "Car McCarface",
    grad: "2025",
    system: ["Business"],
    email: "carmella@example.com",
    subsystem: ["Financial"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "6753g3g5",
    year: "Freshman",
    name: "Jane Doe",
    grad: "2028",
    system: ["Business"],
    email: "carmella@example.com",
    subsystem: ["Public Relations"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "jigu867n",
    year: "Freshman",
    grad: "2026",
    name: "Lorem Ipsum",
    system: ["Chassis"],
    email: "carmella@example.com",
    subsystem: ["Brakes"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "09pkih7n",
    year: "Freshman",
    grad: "2027",
    name: "Rachael Bergeron",
    system: ["Software"],
    email: "carmella@example.com",
    subsystem: ["App Dev"],
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },

  {
    id: "2753odkgof",
    year: "Junior",
    grad: "2030+",
    name: "Mandy Moore",
    system: ["Chassis"],
    email: "carmella@example.com",
    subsystem: ["Aero"],
    joinDate: "2023-09-01",
    hazing: "Uncompleted",
    dues: "Unpaid",
    shirtSize: "XS"
  },
  {
    id: "2934dig",
    year: "Freshman",
    grad: "2029",
    name: "Jayden David",
    system: ["Business"],
    email: "jdavid19@example.com",
    subsystem: ["General Business"],
    joinDate: "2022-10-05",
    hazing: "Uncompleted",
    dues: "Unpaid",
    shirtSize: "XS"
  },
]

