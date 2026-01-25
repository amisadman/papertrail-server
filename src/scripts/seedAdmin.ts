import { config } from "../config/config";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/access";

const seedAdmin = async () => {
  try {
    console.log("Admin seeding started");
    console.log(`Server URL: ${config.serverUrl}`);
    console.log(`Admin Email: ${config.adminEmail}`);
    
    const data = {
      name: "Admin",
      email: config.adminEmail,
      role: UserRole.ADMIN,
      password: config.adminPass,
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email as string,
      },
    });

    if (existingUser) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    console.log(`Calling: ${config.serverUrl}/api/auth/sign-up/email`);
    
    const signUp = await fetch(`${config.serverUrl}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": config.serverUrl as string,
      },
      body: JSON.stringify(data),
    });

    if (!signUp.ok) {
      const errorText = await signUp.text();
      console.error("Signup failed:", signUp.status, errorText);
      process.exit(1);
    }

    console.log("Admin Signup successful");
    await prisma.user.update({
      where: {
        email: config.adminEmail as string,
      },
      data: {
        emailVerified: true,
      },
    });

    console.log("Email Verification successful");
    console.log("Admin seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error during admin seeding:", error);
    process.exit(1);
  }
};

seedAdmin();
