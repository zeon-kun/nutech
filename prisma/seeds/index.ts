import { PrismaClient } from "../../generated/prisma/client.ts";
import { seedBanner } from "./seedBanner.ts";
import { seedService } from "./seedService.ts";
import "dotenv/config";

const prisma = new PrismaClient();

async function seed() {
  // Seed Function Call Goes Here
  try {
    console.log("running seeds");
    await seedBanner(prisma);
    await seedService(prisma);
    console.log("seeding done success");
  } catch (err) {
    console.error(err);
  }
}

seed().then(() => {
  console.log("ALL SEEDING DONE");
});
