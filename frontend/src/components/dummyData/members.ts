export type Member = {
  id: string
  year: "Freshman" | "Sophomore" | "Junior" | "Senior+"
  grad: "2024" | "2025" | "2026" | "2027" | "2028" | "2029+"
  system: "Powertrain" | "Chassis" | "PR" | "Business"
  name: string
  email: string
  subsystem?: string
  joinDate: string
  hazing: "Completed" | "Uncompleted" 
  dues: "Paid" | "Unpaid"
  shirtSize: "XS" | "S" | "M" | "L" | "XL" | "XXL"
  other?: string
}

export const data: Member[] = [
  {
    id: "m5gr84i9",
    year: "Senior+",
    name: "John Smith",
    grad: "2029+",
    system: "Powertrain",
    email: "ken99@example.com",
    subsystem: "Battery",
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Unpaid",
    shirtSize: "XXL",
    other: "No other data"
  },
  {
    id: "3u1reuv4",
    year: "Sophomore",
    name: "CarMella McCarface",
    grad: "2029+",
    system: "Powertrain",
    email: "Abe45@example.com",
    subsystem: "PR",
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
    system: "Powertrain",
    email: "Monserrat44@example.com",
    subsystem: "Battery",
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "5kma53ae",
    year: "Freshman",
    name: "Anna Johnson",
    grad: "2026",
    system: "Chassis",
    email: "Silas22@example.com",
    subsystem: "Battery",
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "bhqecj4p",
    year: "Senior+",
    name: "Harry Potter",
    grad: "2029+",
    system: "Business",
    email: "carmella@example.com",
    subsystem: "Battery",
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
    system: "Business",
    email: "carmella@example.com",
    subsystem: "Battery",
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
    system: "PR",
    email: "carmella@example.com",
    subsystem: "Battery",
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
    system: "Chassis",
    email: "carmella@example.com",
    subsystem: "Battery",
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },
  {
    id: "09pkih7n",
    year: "Freshman",
    grad: "2026",
    name: "Rachael Bergeron",
    system: "Powertrain",
    email: "carmella@example.com",
    subsystem: "Battery",
    joinDate: "2023-09-01",
    hazing: "Completed",
    dues: "Paid",
    shirtSize: "M"
  },

  {
    id: "2753odkgof",
    year: "Junior",
    grad: "2027",
    name: "Mandy Moore",
    system: "Chassis",
    email: "carmella@example.com",
    subsystem: "Aero",
    joinDate: "2023-09-01",
    hazing: "Uncompleted",
    dues: "Unpaid",
    shirtSize: "XS"
  },
]

