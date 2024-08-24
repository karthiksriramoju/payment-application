import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '@repo/db/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, password } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: { number: phone },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        number: phone,
        password: hashedPassword,
      },
    });

    // Create balance record for the new user
    await db.balance.create({
      data: {
        userId: newUser.id,
        amount: 0,
        locked: 0,
      },
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}