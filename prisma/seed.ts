import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; 
import * as bcrypt from 'bcrypt'; // Add this import


const statuses = ["PENDING", "CONFIRMED", "CANCELLED", "FULFILLED"];

const prisma = new PrismaClient();



async function main() {
const saltRounds = 10;
const plainPassword = 'password123';
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Seeding started...");
  // 1. Create a Customer (Prerequisite for Reservation)
  const customer = await prisma.customer.create({
    data: {
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser_' + Math.random(), // Unique
      phoneNo: faker.phone.number(),
      gender: 'MALE',
      location: 'Addis Ababa',
    }
  });
    console.log("Customer created:", customer.id); // ADD THIS


  // 2. Create Owner
  const owner = await prisma.parkingAvenueOwner.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.userName(),
      password: hashedPassword,
      phoneNo: faker.phone.number(),
      email: faker.internet.email(),
      personalId: 'ID-12345',
    }
  });

  // 3. Create Parking Avenue
  const avenue = await prisma.parkingAvenue.create({
    data: {
      name: faker.company.name() + ' Parking',
      address: faker.location.streetAddress(),
      latitude: faker.location.latitude({ min: 8.85, max: 9.15, precision: 6 }),
      longitude: faker.location.longitude({ min: 38.65, max: 38.95, precision: 6 }),
      ownerId: owner.id,
      workingHrs: '08:00-20:00',
      hourlyRate: 50,
      totalSpots: 100,
      currentSpots: 80,
      status: 'OPEN',
      legalDoc: 'doc_url.pdf',
      subCity: 'BOLE'
    }
  });

  // 4. Now run the reservation logic
  // Pass the generated IDs to ensure we have data to work with
  await seedReservations(1000, [customer], [avenue]); 
  console.log("Seeding finished!"); 
}

// Update the function signature to accept the data we just created
async function seedReservations(count: number, users: any[], avenues: any[]) {

  let successCount = 0;

  for (let i = 0; i < count; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomAvenue = avenues[Math.floor(Math.random() * avenues.length)];
    
    const startTime = faker.date.between({ from: '2023-01-01T00:00:00Z', to: '2026-12-31T00:00:00Z' })
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    try {
      await prisma.reservation.create({
        data: {
          bookingRef: `BK-${faker.string.alphanumeric(8).toUpperCase()}`,
          startTime: startTime,
          endTime: endTime,
          durationHours: 2,
          totalPrice: faker.number.int({ min: 50, max: 500 }),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          plateNumber: `${faker.string.alphanumeric(3).toUpperCase()}-${faker.number.int({min: 1000, max: 9999})}`, 
          userId: randomUser.id,
          parkingAvenueId: randomAvenue.id,
          transactionReference: Math.random() > 0.5 
                ? `TX-${faker.string.uuid()}` 
                : `TX-GEN-${i}-${faker.string.alphanumeric(5)}`
        },
      });
      successCount++;
    } catch (error) {
       console.error("Reservation creation failed:", error); 
    }
     console.log(`Successfully seeded ${successCount} reservations.`);
  }
}

main()
  .then(() => console.log("Done!"))
  .catch((e) => {
    console.error("CRITICAL ERROR:", e); // Ensure this is logged
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
