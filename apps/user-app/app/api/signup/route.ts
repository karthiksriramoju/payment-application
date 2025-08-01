import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@repo/db/client';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, password } = await request.json();

    // Validate input
    if (!name || !phone || !password) {
      return NextResponse.json(
        { message: 'Name, phone number and password are required' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation)
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { message: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { number: phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password with higher salt rounds for better security
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        name: name.trim(),
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

    console.log('User created successfully:', { id: newUser.id, name: newUser.name, phone: newUser.number });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 