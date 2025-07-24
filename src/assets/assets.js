import img1 from '../assets/gerard.png';
import img2 from '../assets/jack.png';
import img3 from '../assets/simon.png';
import img4 from '../assets/tom.png';

export const assets = {
  img1,
  img2,
  img3,
  img4,
};

export const driver_list = [
  {
    id: "1",
    driverName: "Rajeev Sharma",
    image: img1,
    rideFare: 12,
    rideCount: 12,
    routeDescription:
      "Daily route from Noida to Connaught Place via DND Flyway. Comfortable and safe ride.",
    address: "Sector 18, Noida, Uttar Pradesh",
    toolPlaza: "Included",
    toolPlazaCount: 8,
    phoneNumber: "+91 9876543210",
    age: 42,
    email: "rajeev.sharma@example.com",
    rideHistory: [
      {
        date: "2025-07-22",
        rides: [
          { time: "07:30 AM", fare: 12 },
          { time: "09:00 AM", fare: 12 },
          { time: "11:15 AM", fare: 12 },
          { time: "01:45 PM", fare: 12 },
          { time: "04:00 PM", fare: 12 },
          { time: "06:30 PM", fare: 12 },
        ],
      },
      {
        date: "2025-07-21",
        rides: [
          { time: "08:00 AM", fare: 12 },
          { time: "10:30 AM", fare: 12 },
          { time: "12:45 PM", fare: 12 },
          { time: "03:00 PM", fare: 12 },
          { time: "05:15 PM", fare: 12 },
          { time: "07:45 PM", fare: 12 },
        ],
      },
    ],
  },
  {
    id: "2",
    driverName: "Anil Verma",
    image: img2,
    rideFare: 18,
    rideCount: 8,
    routeDescription:
      "Morning and evening rides from Gurgaon to Saket. A/C Sedan with music system.",
    address: "DLF Phase 2, Gurgaon, Haryana",
    toolPlaza: "Not Included",
    toolPlazaCount: 0,
    phoneNumber: "+91 9123456780",
    age: 39,
    email: "anil.verma@example.com",
    rideHistory: [
      {
        date: "2025-07-22",
        rides: [
          { time: "08:00 AM", fare: 18 },
          { time: "10:15 AM", fare: 18 },
          { time: "12:30 PM", fare: 18 },
          { time: "03:00 PM", fare: 18 },
          { time: "05:15 PM", fare: 18 },
          { time: "07:45 PM", fare: 18 },
        ],
      },
      {
        date: "2025-07-21",
        rides: [
          { time: "07:30 AM", fare: 18 },
          { time: "09:00 AM", fare: 18 },
          { time: "11:30 AM", fare: 18 },
          { time: "02:00 PM", fare: 18 },
          { time: "04:15 PM", fare: 18 },
        ],
      },
    ],
  },
  {
    id: "3",
    driverName: "Sandeep Mehta",
    image: img3,
    rideFare: 16,
    rideCount: 10,
    routeDescription:
      "Regular pickup from Ghaziabad to South Delhi. Fast & reliable with toll covered.",
    address: "Indirapuram, Ghaziabad, Uttar Pradesh",
    toolPlaza: "Included",
    toolPlazaCount: 5,
    phoneNumber: "+91 9988776655",
    age: 45,
    email: "sandeep.mehta@example.com",
    rideHistory: [
      {
        date: "2025-07-22",
        rides: [
          { time: "07:00 AM", fare: 16 },
          { time: "09:15 AM", fare: 16 },
          { time: "11:45 AM", fare: 16 },
          { time: "02:00 PM", fare: 16 },
          { time: "04:30 PM", fare: 16 },
          { time: "06:00 PM", fare: 16 },
        ],
      },
      {
        date: "2025-07-21",
        rides: [
          { time: "08:15 AM", fare: 16 },
          { time: "10:30 AM", fare: 16 },
          { time: "01:00 PM", fare: 16 },
          { time: "03:30 PM", fare: 16 },
        ],
      },
    ],
  },
  {
    id: "4",
    driverName: "Vikram Chauhan",
    image: img4,
    rideFare: 24,
    rideCount: 5,
    routeDescription:
      "Premium cab from Dwarka to Cyber Hub, includes early morning airport drops too.",
    address: "Sector 10, Dwarka, New Delhi",
    toolPlaza: "Not Included",
    toolPlazaCount: 0,
    phoneNumber: "+91 9090909090",
    age: 36,
    email: "vikram.chauhan@example.com",
    rideHistory: [
      {
        date: "2025-07-22",
        rides: [
          { time: "06:30 AM", fare: 24 },
          { time: "09:00 AM", fare: 24 },
          { time: "11:30 AM", fare: 24 },
          { time: "02:15 PM", fare: 24 },
          { time: "04:45 PM", fare: 24 },
          { time: "07:00 PM", fare: 24 },
        ],
      },
      {
        date: "2025-07-21",
        rides: [
          { time: "07:15 AM", fare: 24 },
          { time: "10:00 AM", fare: 24 },
          { time: "12:45 PM", fare: 24 },
          { time: "03:00 PM", fare: 24 },
        ],
      },
    ],
  },
];
